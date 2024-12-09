import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to send requests to the external API
async function fetchFromApi(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error during API request to ${endpoint}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Create a new user
export async function POST(req: Request) {
  const userData = await req.json();
  return fetchFromApi('/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

// GET: Fetch all users or a specific user by ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  const endpoint = userId ? `/user/${userId}` : '/user';
  return fetchFromApi(endpoint);
}

// PATCH: Update an existing user by ID
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required for updates' },
      { status: 400 }
    );
  }

  const userData = await req.json();
  return fetchFromApi(`/user/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

// DELETE: Delete a user by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required for deletion' },
      { status: 400 }
    );
  }

  return fetchFromApi(`/user/${userId}`, { method: 'DELETE' });
}
