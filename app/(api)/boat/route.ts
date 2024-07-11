import connect from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

//Handle GET requests to boat
export async function GET(request: Request) {
    const client = await connect
    const cursor = await client.db("marinetracker").collection("aisData").find();
    const boats = await cursor.toArray()
    return Response.json(boats)
}

//Handle POST requests to boat
export async function POST(request: Request) {
    const client = await connect;
    const body = await request.json();

    try {
        // Insert the body directly instead of wrapping it in another object
        await client.db("marinetracker").collection("aisData").insertOne(body);
        return new Response(JSON.stringify({ message: "Successfully updated the document" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Failed to insert document:", error);
        return new Response(JSON.stringify({ message: "Failed to update the document", error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

//Handle PUT requests to boat
export async function PUT(request: Request){
    const client = await connect;
    const id = new ObjectId("659fcf9cc861d2ffb04fe17c")
    await client.db("test").collection("greetings").updateOne({_id: id}, {greeting:"this greeting has been updated"});
    return Response.json({message: "successfully updated the document"})
}