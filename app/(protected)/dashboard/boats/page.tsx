"use client";

import { useEffect, useState } from 'react';
import BoatTable from "@/app/(protected)/dashboard/components/boat-table";

export default function DashboardBoats() {
    const [aisData, setAisData] = useState([]);

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await fetch('/boat', {
                    method: "GET",
                });
                if (response.ok) {
                    const responseBody = await response.json();
                    setAisData(responseBody);
                }
            } catch (error) {
                console.error("Failed to fetch boat data:", error);
            }
        }

        fetchDetails();
    }, []);

    return (
        <div>
            <BoatTable data={aisData} />
        </div>
    );
}