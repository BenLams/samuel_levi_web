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
    const fees = await db.collection('fees').findOne();
    return new Response(JSON.stringify(fees || {
      applicationFee: '50,000',
      idCardFee: '10,000',
      tuitionFee: '300,000',
      uniformFee: '100,000',
      songBookFee: '5,000',
      otherRequirements: '50,000',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching fees:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch fees' }), {
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

    if (action === 'update') {
      const updatedFees = {
        applicationFee: data.applicationFee || '50,000',
        idCardFee: data.idCardFee || '10,000',
        tuitionFee: data.tuitionFee || '300,000',
        uniformFee: data.uniformFee || '100,000',
        songBookFee: data.songBookFee || '5,000',
        otherRequirements: data.otherRequirements || '50,000',
      };
      await db.collection('fees').updateOne({}, { $set: updatedFees }, { upsert: true });
      return new Response(JSON.stringify({ success: true, data: updatedFees }), {
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