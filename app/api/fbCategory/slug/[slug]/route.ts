import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbCategory/slug/${slug}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Category not found for the provided slug' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/fbCategory/[slug]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
