import { MongoClient } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  await client.connect();
  return client.db();
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const filename = formData.get('filename') || (file instanceof File ? file.name : 'default.jpg'); // Use provided or original filename

  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ success: false, message: 'No file uploaded' }), { status: 400 });
  }

  const db = await connectToDatabase();
  const imagesDir = path.join(process.cwd(), 'public/images');

  try {
    // Ensure directory exists
    await fs.mkdir(imagesDir, { recursive: true });

    // Save file with original filename, replacing if it exists
    const filePath = path.join(imagesDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    // Update or insert into images collection
    await db.collection('images').updateOne(
      { filename },
      { $set: { filename, uploadedAt: new Date() } },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true, fileName: filename }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Upload failed' }), { status: 500 });
  }
}