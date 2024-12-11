import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTable/fbCategory/${id}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `fbCategory with ID ${id} not found` },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
