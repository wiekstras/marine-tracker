"use client";

import {Navbar} from "@/components/navbar";
import dynamic from "next/dynamic";
import {useEffect, useMemo, useState} from "react";


export default function Home() {
    const [aisData, setAisData] = useState([]);

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await fetch('/boat', {
                    method: "GET",
                });
                if (response.ok) {
                    const responseBody = await response.json();
                    setAisData(responseBody.slice(0, 500)); // Limit to 10k boats
                }
            } catch (error) {
                console.error("Failed to fetch boat data:", error);
            }
        }

        fetchDetails();
    }, []);

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
  return (
      <div className="flex flex-col min-h-screen">
          <div className="h-[65px] z-10">
            <Navbar/>
          </div>
        <div className="flex-1 z-0">
            <Map data={aisData} markersEnabled={false}/>
        </div>
      </div>

  );
}