from flask import Flask, request, jsonify
import socket
import ais
import re
import datetime
import requests
import json
import uuid
import threading
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

HOST = "153.44.253.27"
PORT = 5631
API_KEY = "8M1oEIxVnFOTWJXh7JOMA15g6Zn9Ny3o3/zH3WLBWzY="

Buffer = []
gathering_data = False


def custom_parse(message):
    tag_field = re.search(r'\\(.*?)\\', message)
    if tag_field:
        tag = tag_field.group(1)
    else:
        tag = None

    message_without_tag = message.replace(f"\\{tag}\\", "")
    fields = message_without_tag.split(',')

    ais_data = {
        "tag": tag,
        "sentence_type": fields[0],
        "sen_tot": int(fields[1]),
        "sen_num": int(fields[2]),
        "seq_id": fields[3],
        "chan": fields[4],
        "body": fields[5],
        "fill_bits": int(fields[6].split('*')[0]),
        "checksum": fields[6].split('*')[1].replace('\r\n', '')
    }

    return ais_data


def convert_to_serializable(data):
    if isinstance(data, datetime.datetime):
        return data.isoformat()
    raise TypeError(f"Type {type(data)} not serializable")


def gather_data():
    global Buffer  # Declare Buffer as global
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        while gathering_data:
            data = b''
            while True:
                data += s.recv(1)
                if data[-2:] == b'\r\n':
                    entry = data.decode()
                    message = custom_parse(entry)

                    if message:
                        body = message['body']
                        pad = message['fill_bits']

                        sen_tot = message['sen_tot']
                        sen_num = message['sen_num']

                        if sen_num < sen_tot and sen_tot > 1:
                            Buffer.append(body)
                        elif sen_num == sen_tot and sen_tot > 1:
                            Buffer.append(body)
                            try:
                                msg = ais.decode(''.join(Buffer), pad)
                                msg["original"] = entry
                                msg["time"] = datetime.datetime.now()
                                msg["uid"] = str(uuid.uuid4())
                                msg_serializable = json.dumps(msg, default=convert_to_serializable)
                                headers = {'x-api-key': API_KEY}
                                response = requests.post('http://localhost:3000/boat',
                                                         json=json.loads(msg_serializable), headers=headers)
                                if response.status_code == 200:
                                    print(f"success: {response.status_code}, {response.text}")
                                if response.status_code != 200:
                                    print(f"Failed to send data: {response.status_code}, {response.text}")
                            except Exception as e:
                                print(f"FAILED TO DECODE MESSAGE: {e}")
                            Buffer = []  # Clear Buffer after processing
                        else:
                            try:
                                msg = ais.decode(body, pad)
                                msg["original"] = entry
                                msg["time"] = datetime.datetime.now()
                                msg["uid"] = str(uuid.uuid4())
                                msg_serializable = json.dumps(msg, default=convert_to_serializable)
                                headers = {'x-api-key': API_KEY}
                                response = requests.post('http://localhost:3000/boat',
                                                         json=json.loads(msg_serializable), headers=headers)
                                if response.status_code != 200:
                                    print(f"Failed to send data: {response.status_code}, {response.text}")
                            except Exception as e:
                                print(f"FAILED TO DECODE MESSAGE: {e}")
                    else:
                        print("MESSAGE CANNOT BE PARSED!")

                    break


def check_api_key():
    api_key = request.headers.get('x-api-key')
    if not api_key or api_key != API_KEY:
        return False
    return True


@app.route('/start-gathering', methods=['POST'])
def start_gathering():
    global gathering_data
    global Buffer
    if not check_api_key():
        return jsonify({'error': 'Unauthorized'}), 403

    if not gathering_data:
        gathering_data = True
        Buffer = []  # Initialize Buffer
        threading.Thread(target=gather_data).start()
        return jsonify({'status': 'Data gathering started'}), 200
    else:
        return jsonify({'status': 'Data gathering already running'}), 400


@app.route('/stop-gathering', methods=['POST'])
def stop_gathering():
    global gathering_data
    if not check_api_key():
        return jsonify({'error': 'Unauthorized'}), 403

    if gathering_data:
        gathering_data = False
        return jsonify({'status': 'Data gathering stopped'}), 200
    else:
        return jsonify({'status': 'No data gathering process running'}), 400

@app.route('/status', methods=['GET'])
def status():
    return jsonify({'status': gathering_data})



if __name__ == '__main__':
    app.run(port=5000)
