import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  await client.connect();
  return client.db();
}

export async function GET() {
  const db = await connectToDatabase();
  const images = await db.collection('images').find({}, { projection: { filename: 1, _id: 0 } }).toArray();
  return new Response(JSON.stringify(images), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}