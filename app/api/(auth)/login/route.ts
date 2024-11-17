import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('Incoming request:', req);

    const { email, password } = await req.json();
    console.log('Parsed data:', { email, password });
    console.log('apiKey', process.env.NEXT_PUBLIC_API_KEY);

    // Forward to backend or implement your logic here
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Login failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
