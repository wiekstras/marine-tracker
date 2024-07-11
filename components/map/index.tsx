"use client";

import { useEffect, useState } from 'react';

import MapRenderer from "@/components/map/map-renderer";

interface MapPropInterface {
    data: any;
    markersEnabled: boolean;
}
export default function Map({data, markersEnabled}: MapPropInterface) {
    return (
        <MapRenderer posix={[53.3999984, 5.3166654]} aisData={data} zoom={6} markersEnabled={markersEnabled}/>
    )
}