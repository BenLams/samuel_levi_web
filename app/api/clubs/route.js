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
    const clubs = await db.collection('clubs').find().toArray();
    return new Response(JSON.stringify(clubs.map(club => club.name) || ['Christian Youth Fellowship', 'Science Club', 'Debate Club', 'Art & Craft Society']), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch clubs' }), {
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
      if (!data.name) {
        return new Response(JSON.stringify({ success: false, error: 'Club name is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const newClub = { 
        name: data.name, 
        id: Date.now(), 
        image: data.image || `/images/club1.jpg` 
      };
      await db.collection('clubs').insertOne(newClub);
      return new Response(JSON.stringify({ success: true, data: newClub }), {
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
      const result = await db.collection('clubs').deleteOne({ id: data.id });
      if (result.deletedCount === 0) {
        return new Response(JSON.stringify({ success: false, error: 'Club not found' }), {
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