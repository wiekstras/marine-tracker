"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react";
import Vesselfinder from "@/components/map/find-ship";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
    aisData: any[],
    markersEnabled: boolean
}

const defaults = {
    zoom: 8,
};

const getCustomPopup = (markersData: any) => {
    if (!markersData.shipData) {
        return null; // Handle the case where shipData is not defined
    }

    const shipData = JSON.parse(markersData.shipData); // Parse the shipData

    return (
        <div id="shipPopup">
            <Vesselfinder mmsi={shipData.mmsi} />
            <p><b><u>Data:</u></b></p>
            <div>
                <span><b>Timestamp:</b> {new Date(shipData.time).toLocaleString()}</span><br />
                <span><b>Longitude:</b> {shipData.x}</span><br />
                <span><b>Latitude:</b> {shipData.y}</span><br />
                <span><b>Cog:</b> {shipData.cog}</span><br />
                <span><b>MMSI:</b> {shipData.mmsi}</span><br />
            </div>
        </div>
    );
};

const MapRenderer = (Map: MapProps) => {
    const { zoom = defaults.zoom, posix, aisData, markersEnabled } = Map;
    const [markers, setMarkers] = useState([]);
    const [polyline, setPolyline] = useState([]);

    useEffect(() => {
        // Reset the markers and polyline
        setMarkers([]);
        setPolyline([]);

        if (!posix || !Array.isArray(posix) || posix.length !== 2 || typeof posix[0] !== 'number' || typeof posix[1] !== 'number') {
            console.error("Invalid posix:", posix);
            return;
        }

        // Process the AIS data into markers
        const markersData = aisData
            .filter(item => typeof item.y === 'number' && typeof item.x === 'number') // Filter out items with invalid coordinates
            .map(item => ({
                geocode: [item.y, item.x],
                popUp: `Ship (${item.mmsi})`,
                key: item._id,
                shipData: JSON.stringify(item),
            }));

        setMarkers(markersData);
        console.log("Markers Data:", markersData);

        if (markersEnabled) {
            const polylineData = aisData
                .filter(item => typeof item.y === 'number' && typeof item.x === 'number')
                .map(item => [item.y, item.x]);
            setPolyline(polylineData);
            console.log("Polyline Data:", polylineData);
        }

    }, [aisData, posix, markersEnabled]); // Update markers when aisData changes

    return (
        <MapContainer
            center={posix}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100vh" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((markersData) => (
                <Marker position={markersData.geocode} key={markersData.key}>
                    <Popup className="bg-red-200">{getCustomPopup(markersData)}</Popup>
                </Marker>
            ))}
            {polyline && polyline.length > 0 && (
                <Polyline pathOptions={{ color: 'lime' }} positions={polyline} />
            )}
        </MapContainer>
    );
}

export default MapRenderer;