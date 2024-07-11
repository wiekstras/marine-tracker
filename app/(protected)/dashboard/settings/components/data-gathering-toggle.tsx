// DataGatheringToggle.js

import React from 'react';

const DataGatheringToggle = ({ dataGathering, setDataGathering }) => {
    const toggleDataGathering = async () => {
        const action = dataGathering ? 'stop' : 'start';
        const API_KEY = process.env.API_KEY; // Ensure to use REACT_APP_ prefix

        try {
            const endpoint = action === 'start' ? 'http://127.0.0.1:5000/start-gathering' : 'http://127.0.0.1:5000/stop-gathering';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY, // Use API_KEY directly
                },
                body: JSON.stringify({ action }),
            });

            if (response.ok) {
                setDataGathering(action === 'start');
            } else {
                console.error(`Failed to ${action} data gathering:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error ${action}ing data gathering:`, error);
        }
    };

    return (
        <div>
            <h1>Data Gathering Toggle</h1>
            <label>
                <input
                    type="checkbox"
                    checked={dataGathering}
                    onChange={toggleDataGathering}
                />
                Toggle Data Gathering
            </label>
        </div>
    );
};

export default DataGatheringToggle;