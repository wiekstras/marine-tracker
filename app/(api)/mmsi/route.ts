import connect from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import {NextApiRequest, NextApiResponse} from "next";
import {useSearchParams} from "next/navigation";


//Handle GET requests to boat
// export async function GET(request: Request) {
//
//     console.log(search);
//     const client = await connect
//     const cursor = await client.db("marinetracker").collection("aisData").find();
//     const boats = await cursor.toArray()
//     return Response.json(boats)
// }

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const mmsi_number = request.nextUrl.searchParams.get("mmsi");
    const client = await connect;
    const boats = await client.db("marinetracker").collection("aisData").find({ mmsi: Number(mmsi_number) }).toArray();
    if (!boats.length) throw new Error("MMSI not found");
    console.log(boats)
    return Response.json(boats);
}