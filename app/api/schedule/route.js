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
    const schedule = await db.collection('schedule').findOne();
    return new Response(JSON.stringify(schedule || {
      applicationOpens: 'June 1, 2025',
      applicationDeadline: 'July 15, 2025',
      documentDeadline: 'July 20, 2025',
      interviews: 'July 25–30, 2025',
      results: 'August 5, 2025',
      registrationDeadline: 'August 15, 2025',
      schoolReopens: 'September 1, 2025',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch schedule' }), {
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
      const updatedSchedule = {
        applicationOpens: data.applicationOpens || 'June 1, 2025',
        applicationDeadline: data.applicationDeadline || 'July 15, 2025',
        documentDeadline: data.documentDeadline || 'July 20, 2025',
        interviews: data.interviews || 'July 25–30, 2025',
        results: data.results || 'August 5, 2025',
        registrationDeadline: data.registrationDeadline || 'August 15, 2025',
        schoolReopens: data.schoolReopens || 'September 1, 2025',
      };
      await db.collection('schedule').updateOne({}, { $set: updatedSchedule }, { upsert: true });
      return new Response(JSON.stringify({ success: true, data: updatedSchedule }), {
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