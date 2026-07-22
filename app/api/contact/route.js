import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, website, message } = body;

    // Validate simple required fields
    if (!name || !email || !body.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { Client, Databases, ID } = require('node-appwrite');

    const client = new Client()
      .setEndpoint('https://sgp.cloud.appwrite.io/v1')
      .setProject('6a4f8178002dec192690')
      .setKey('standard_f639dd7f5382bebab83a85b1d679cae4c5aae30959dbee07fb663103792923d217625dc43c2de191c92169a90e80f2725cecf95f9816342afd30f258c0fbf0119161f2166196e94bd101afb9086324ff3a428eacbab23bad6464a1e4c66897cb905e02f3832733dd821bfa752e6c564c5b9c8e0c6741cd88aa89aa7b3dbab94e');

    const databases = new Databases(client);

    await databases.createDocument(
      'portfolioDB',
      'leads',
      ID.unique(),
      {
        name: name,
        email: email,
        phone: body.phone || '', // phone is optional but passed from form
        message: message
      }
    );

    // Return success response
    return NextResponse.json({ success: true, message: 'Message received successfully' }, { status: 200 });
    
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
