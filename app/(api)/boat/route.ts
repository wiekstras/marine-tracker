import connect from '@/lib/mongodb'

export async function GET(request: Request) {
    const client = await connect
    const cursor = await client.db("marinetracker").collection("aisData").find();
    const greetings = await cursor.toArray()
    return Response.json(greetings)
}