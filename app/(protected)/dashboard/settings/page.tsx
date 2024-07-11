"use client";

import React, { useState, useEffect } from 'react';
import {useCurrentRole} from "@/hooks/use-current-role";
import {RoleGate} from "@/components/auth/role-gate";


const SettingsPage = () => {
    const [dataGathering, setDataGathering] = useState(false);
    const [apiKey, SetApiKey] = useState( process.env.API_KEY);
    const role = useCurrentRole();
    useEffect(() => {

        // Function to fetch current data gathering status
        const fetchStatus = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/status', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        //TODO Fix this
                        'x-api-key': '8M1oEIxVnFOTWJXh7JOMA15g6Zn9Ny3o3/zH3WLBWzY=', // Use API_KEY directly
                        // 'x-api-key': process.env.REACT_APP_API_KEY,  // Include API key from environment variable
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setDataGathering(data.status);
                } else {
                    console.error('Failed to fetch server status:', response.statusText);
                    setDataGathering(false);
                }
            } catch (error) {
                console.error('Error fetching server status:', error);
                setDataGathering(false);

            }

        };

        fetchStatus();
    }, []);

    const toggleDataGathering = async () => {
        const action = dataGathering ? 'stop' : 'start';

        try {
            const endpoint = action === 'start' ? 'http://127.0.0.1:5000/start-gathering' : 'http://127.0.0.1:5000/stop-gathering';

            const response = await fetch(endpoint, {
                body: JSON.stringify({ action }),
                headers: {
                    'Content-Type': 'application/json',
                    //TODO Fix this
                    'x-api-key': '8M1oEIxVnFOTWJXh7JOMA15g6Zn9Ny3o3/zH3WLBWzY=',
                    // 'x-api-key': process.env.REACT_APP_API_KEY,  // Include API key from environment variable


                },
                method: 'POST',
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
        <RoleGate allowedRole="ADMIN">
        <div>
            <h1>Settings Page</h1>
            <label>
                <p>Server Status: {dataGathering}</p>
                <p>Current role {role}</p>
                <input
                    type="checkbox"
                    checked={dataGathering}
                    onChange={toggleDataGathering}
                />
                Toggle Data Gathering
            </label>
        </div>
        </RoleGate>
    );
};

export default SettingsPage;