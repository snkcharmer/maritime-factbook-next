import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const userCategoryData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user-category`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCategoryData),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create user category' },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/user-category:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user-category`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'No user categories found' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/user-category:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
