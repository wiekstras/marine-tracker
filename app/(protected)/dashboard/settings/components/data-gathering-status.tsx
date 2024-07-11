// DataGatheringToggle.js

import React from 'react';

const DataGatheringToggle = ({ dataGathering, setDataGathering }) => {
    const toggleDataGathering = async () => {
        const action = dataGathering ? 'stop' : 'start';
        const API_KEY = '8M1oEIxVnFOTWJXh7JOMA15g6Zn9Ny3o3/zH3WLBWzY='

        console.log('API_KEY:', API_KEY); // Log API_KEY to check its value

        try {
            const endpoint = action === 'start' ? 'http://127.0.0.1:5000/start-gathering' : 'http://127.0.0.1:5000/stop-gathering';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-api-key': 'test/zH3WLBWzY=', // Use API_KEY directly
                    'test': 'test'
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