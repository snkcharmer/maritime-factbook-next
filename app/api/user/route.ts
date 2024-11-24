import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const fbTableData = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fbTable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fbTableData),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create fbTable entry' },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/fbTable:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get fbTable entries for a user
export async function GET(req: Request) {
  try {
    const userId = req.url.split('/').pop(); // Assuming userId is passed as URL parameter

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTable/${userId}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'No fbTable entries found' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/fbTable:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update an existing fbTable entry
export async function PATCH(req: Request) {
  try {
    const fbTableId = req.url.split('/').pop(); // Assuming fbTable ID is passed in the URL
    const fbTableData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTable/${fbTableId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbTableData),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to update fbTable entry' },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PATCH /api/fbTable:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete a fbTable entry
export async function DELETE(req: Request) {
  try {
    const fbTableId = req.url.split('/').pop(); // Assuming fbTable ID is passed in the URL

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTable/${fbTableId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to delete fbTable entry' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/fbTable:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
