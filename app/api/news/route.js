import { MongoClient } from 'mongodb';

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  async function connectToDatabase() {
    await client.connect();
    return client.db();
  }

  export async function GET() {
    const db = await connectToDatabase();
    const news = await db.collection('news').find().toArray();
    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  export async function POST(req) {
    const db = await connectToDatabase();
    const { action, data } = await req.json();
    if (action === 'add') {
      const result = await db.collection('news').insertOne({ ...data, id: data.id, timestamp: new Date() });
      return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 200 });
    } else if (action === 'delete') {
      await db.collection('news').deleteOne({ id: data.id });
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else if (action === 'edit') {
      await db.collection('news').updateOne({ id: data.id }, { $set: data });
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }