import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTable/slug/${slug}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Table not found for the provided slug' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
