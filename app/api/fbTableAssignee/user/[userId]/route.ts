import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTableAssignee/user/${userId}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: `Tables not found` }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching your tables:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
