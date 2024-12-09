import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const fbTableAssigneeData = await req.json();

    if (!Array.isArray(fbTableAssigneeData.userId)) {
      return NextResponse.json(
        { error: '`userId` must be an array' },
        { status: 400 }
      );
    }

    const requests = fbTableAssigneeData.userId.map(async (userId: string) => {
      const payload = { ...fbTableAssigneeData, userId };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fbTableAssignee`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to assign table for userId: ${userId}`);
      }

      return response.json();
    });

    const results = await Promise.all(requests);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in POST /api/fbTableAssignee:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    const endpoint = id
      ? `${process.env.NEXT_PUBLIC_API_URL}/fbTableAssignee/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/fbTableAssignee`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'No fbTableAssignee entries found' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/fbTableAssignee:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
