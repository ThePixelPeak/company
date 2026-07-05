import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, website, message } = body;

    // Validate simple required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Here you would typically send this data to a webhook (like n8n, Zapier)
    // or a BaaS (like Appwrite, Supabase) or simply email it via Resend/SendGrid.
    // 
    // Example:
    // await fetch('https://your-n8n-webhook-url.com', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, website, message, source: 'Pixelpeak Web' })
    // });

    // For now, we simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return success response
    return NextResponse.json({ success: true, message: 'Message received successfully' }, { status: 200 });
    
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
