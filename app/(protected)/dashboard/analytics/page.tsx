// components/DashboardFindBoat.tsx
"use client";
import React, {useMemo, useState} from 'react';
import dynamic from "next/dynamic";

async function fetchBoatByMMSI(mmsi: number) {
    const response = await fetch(`/mmsi?mmsi=${mmsi}`);
    if (!response.ok) {
        throw new Error('Failed to fetch boat data');
    }
    return response.json();
}

const DashboardFindBoat: React.FC = () => {
    const [mmsi, setMmsi] = useState<number>();
    const [boats, setBoats] = useState<any[]>([]);
    const [error, setError] = useState<string>('');

    const handleSearch = async () => {
        setError('');
        try {
            const data = await fetchBoatByMMSI(mmsi);
            setBoats(data);
        } catch (error) {
            setError('Failed to fetch boat data');
        }
    };


    const Map = useMemo(() => dynamic(
        () => import('@/components/map/'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Find Boat by MMSI</h1>
            <div className="flex mb-4">
                <input
                    type="number"
                    value={mmsi}
                    onChange={(e) => setMmsi(Number(e.target.value))}
                    placeholder="Enter MMSI number"
                    className="border p-2 mr-2"
                    required
                />
                <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Search
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <Map data={boats} markersEnabled={true}/>
            {boats.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Location Information</h2>
                    {boats.map((boat, index) => (
                        <div key={index} className="border rounded p-4 mb-4">
                            <p><strong>MMSI:</strong> {boat.mmsi}</p>
                            <p><strong>location x:</strong> {boat.x}</p>
                            <p><strong>location x:</strong> {boat.y}</p>

                            <p><strong>Timestamp:</strong> {new Date(boat.time).toLocaleString()}</p>


                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default DashboardFindBoat;