import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTable/${id}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `fbTable with ID ${id} not found` },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching fbTable with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const updatedData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTable/${id}`,
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
        { error: `Failed to update fbTable with ID ${id}` },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error updating fbTable with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}