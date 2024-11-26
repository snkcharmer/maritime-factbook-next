import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const fbCategoryData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbCategory`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbCategoryData),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create fbCategory entry' },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/fbCategory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const categoryId = url.searchParams.get('id');

    const endpoint = categoryId
      ? `${process.env.NEXT_PUBLIC_API_URL}/fbCategory/${categoryId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/fbCategory`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'No fbCategory entries found' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/fbCategory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const categoryId = url.pathname.split('/').pop();
    const updatedData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbCategory/${categoryId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to update fbCategory entry' },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PATCH /api/fbCategory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const categoryId = url.pathname.split('/').pop();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbCategory/${categoryId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to delete fbCategory entry' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/fbCategory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
