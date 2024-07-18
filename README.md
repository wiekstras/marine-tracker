# AIS Data Gathering and Display Application

This project consists of two main components:
1. A Python Flask application for gathering AIS (Automatic Identification System) data.
2. A Next.js application for displaying the gathered AIS data.

## Features

### Flask Application
- Connects to a specified AIS data source.
- Parses and decodes AIS messages.
- Sends decoded data to an API endpoint.
- Provides endpoints to start and stop data gathering.
- Secured with an API key for authorized access.

### Next.js Application
- Fetches and displays the AIS data from the Flask application.
- Shows the route of the boats on a map based on MMSI.
- Show graphs about how many boats are in the area.
- Authenticated with a login page. And ROLES for the users.
- Add favorites boats to the user account and display them. 

## Security

The Flask application uses an API key to secure the endpoints. Only requests with the correct API key in the headers can start or stop data gathering. This helps prevent unauthorized access and misuse of the service.

The Next.js application uses a login page to authenticate users. The user can have different roles, and the application will show different pages based on the user's role.

All the input fields are being validated to prevent SQL injection and XSS attacks.

## Installation Guide

### Prerequisites

- Python 3.7 or higher for the Flask application
- Node.js 14 or higher for the Next.js application
- `pip` (Python package installer)
- `npm` or `yarn` (Node package manager)

### Setting Up the Flask Application

1. Clone the repository or download the application files.
2. Navigate to the `database` directory.
3. Create a virtual environment (optional but recommended):

    ```bash
    python3 -m venv venv
    source venv/bin/activate   # On Windows use `venv\Scripts\activate`
    ```

4. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Set the create a `.env` based on the `.env.example` file in the `root` directory with the preferred content


6. Run the Flask application:

    ```bash
    python main.py
    ```

The Flask application will start running on `http://localhost:5000`.

### Setting Up the Next.js Application

1. Navigate to the `root` directory.
2. Install the required dependencies:

    ```bash
    npm install
    ```

   or

    ```bash
    yarn install
    ```
   
3. Fill in the .env you have created earlier based on `example.env`
4. Change the API key in `dashboard/settings/page.tsx` line `22` and `55`


The Next.js application will start running on `http://localhost:3000`.

### Setting Up the Database 

1. Create a account at https://account.mongodb.com/account/register?signedOut=true and create a cluster
2. Create a db user and password and add the IP address to the whitelist
3. Create a `.env` file in the `root` directory with the following content:

    ```env
    DATABASE_URL=your_mongodb_uri_here
    ```
4. Run in the terminal the following command to generate the database:

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5. Validate the documents where created by checking the MongoDB Atlas dashboard.
    
The database is now successfully setup!

### Mail settings

1. To ensure that the mails are being sent, you need a mail server.
2. I used my own mail server in the demo. You can use your own mail server or mine for testing.
3. If you want to use mine, please contact me to get the credentials.
4. In `./lib/mail.ts` are the settings configured it is using nodemailer. You can change the settings to your own mail server.
5. If you dont want to use the mail system you cant use the forgot password functionality and register account out of the box.
6. To disable the verify mail step in the registration process, you need to disable the check at `./actions/login.ts line 29-36`
7. If you need help please contact me.

The mail server is now ready to go.

### Post installation
1. Run the Next.js application and the python application:
2. Navigate to the `root` directory.

    ```bash
    npm run dev
    ```

   or

    ```bash
    yarn dev
    ```
3. Navigate to the `database` directory.

    ```bash
    python main.py
    ```
   
4. Create a user account in the application.
5. Go to the database and change the role of the user to `ADMIN` to get access to the admin panel.
6. You can now start using the application.

### How They Work Together

- The Flask application gathers AIS data and sends it trough the nextjs api.
- The Flask application provides an API endpoint to start and stop data gathering.
- The nextjs fetches the data from the database and displays it.

### API Endpoints

#### Flask Application

##### Start Data Gathering

- **URL**: `/start-gathering`
- **Method**: `POST`
- **Headers**: `x-api-key: your_api_key_here`
- **Response**:
    - `200`: Data gathering started
    - `400`: Data gathering already running
    - `403`: Unauthorized

##### Stop Data Gathering

- **URL**: `/stop-gathering`
- **Method**: `POST`
- **Headers**: `x-api-key: your_api_key_here`
- **Response**:
    - `200`: Data gathering stopped
    - `400`: No data gathering process running
    - `403`: Unauthorized

##### Check Status

- **URL**: `/status`
- **Method**: `GET`
- **Response**:
    - `200`: JSON object with the current status of data gathering

##### Get Boat Data

- **URL**: `/boat`
- **Method**: `GET`
- **Response**:
    - `200`: JSON object with the boat data

##### MMSI Endpoint

- **URL**: `/mmsi?mmsi=your_mmsi_here`
- **Method**: `GET`
- **Body**: JSON object with the MMSI number
- **Response**:
    - `200`: JSON object with the boat data