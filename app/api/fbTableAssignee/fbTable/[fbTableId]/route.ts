import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { fbTableId: string } }
) {
  try {
    const { fbTableId } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTableAssignee/fbTable/${fbTableId}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `fbTableAssignee with ID ${fbTableId} not found` },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(
      `Error fetching fbTableAssignee with ID ${params.fbTableId}:`,
      error
    );
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
