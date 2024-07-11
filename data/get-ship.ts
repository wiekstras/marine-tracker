"use server";

import {db} from '@/lib/db'

export const getBoatsByMMSI = async (mmsi: number) => {
    try {
        return await db.aisData.findFirst({
            where: {
                mmsi,
            },
        });
    } catch (error) {
        console.error(`Error getting liked boats: ${error}`);
        return null;
    }
};