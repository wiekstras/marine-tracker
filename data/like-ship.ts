"use server";

import {db} from '@/lib/db'

export const likeBoat = async (userId: string, mmsi: number, boatId: string) => {
    try {
        // Fetch the boat by MMSI to get its ID using findFirst
        const likedBoat = await db.likedBoat.findFirst({
            where: {
                userId,
                mmsi,
            },
        });

        if (likedBoat) {
            console.log(`User ${userId} already liked boat with MMSI ${mmsi}.`);
            return;
        }

        console.log(`User ${userId} is liking boat with MMSI ${mmsi}.`);
        await db.likedBoat.create({
            data: {
                userId,
                mmsi,
                boatId
            },
        });

        console.log(`User ${userId} liked boat with MMSI ${mmsi}.`);
    } catch (error) {
        console.error(`Error liking boat: ${error}`);
    }
};

export const getLikedBoats = async (userId: string) => {
    try {
        const likedBoats = await db.likedBoat.findMany({
            where: {
                userId,
            },
        });
        return likedBoats;
    } catch (error) {
        console.error(`Error getting liked boats: ${error}`);
        return null;
    }
};

export const unlikeBoat = async (userId, mmsi) => {
    try {
        console.log(`User ${userId} is unliking boat with MMSI ${mmsi}.`);
        await db.likedBoat.delete({
            where: {
                userId_mmsi: {
                    userId,
                    mmsi,
                },
            },
        });
        console.log(`User ${userId} unliked boat with MMSI ${mmsi}.`);
    } catch (error) {
        console.error(`Error unliking boat: ${error}`);
    }
}
export const getLikedBoatsCount = async (userId: string) => {
    try {
        return await db.likedBoat.count({
            where: {
                userId,
            },
        });
    } catch (error) {
        console.error(`Error getting liked boats count: ${error}`);
        return null;
    }
}