import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const events = await db.collection('school-events').find().toArray();
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching school events:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch events' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const { action, data } = await req.json();

    if (!action || !data) {
      return new Response(JSON.stringify({ success: false, error: 'Action and data are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'add') {
      if (!data.title || !data.date) {
        return new Response(JSON.stringify({ success: false, error: 'Title and date are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const newEvent = { ...data, id: Date.now(), timestamp: new Date() };
      const result = await db.collection('school-events').insertOne(newEvent);
      const insertedEvent = { ...newEvent, _id: result.insertedId };
      return new Response(JSON.stringify({ success: true, data: insertedEvent }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (action === 'delete') {
      if (!data.id) {
        return new Response(JSON.stringify({ success: false, error: 'ID is required for deletion' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const result = await db.collection('school-events').deleteOne({ id: data.id });
      if (result.deletedCount === 0) {
        return new Response(JSON.stringify({ success: false, error: 'Event not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Invalid action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}