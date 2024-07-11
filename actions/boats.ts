"use server";

import connect from '@/lib/mongodb';
import {ObjectId} from "mongodb";

export async function fetchBoats() {
    const client = await connect
    const cursor = await client.db("marinetracker").collection("aisData").find();
    return await cursor.toArray()
}


export async function getBoatById(id: string) {
    const client = await connect;
    const boat = await client.db("marinetracker").collection("aisData").findOne({ _id: new ObjectId(id) });
    if(!boat) throw new Error("Boat not found");
    if(boat.length > 1) {
        return boat[0];
    }

    return boat;
}

export async function getBoatByMMSI(mmsi_number: number) {
    const client = await connect;
    const boats = await client.db("marinetracker").collection("aisData").find({ mmsi: mmsi_number }).toArray();
    if (!boats.length) throw new Error("MMSI not found");

    return boats; // Return an array of plain objects
}