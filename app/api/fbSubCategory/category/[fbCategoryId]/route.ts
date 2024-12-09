import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { fbCategoryId: string } }
) {
  try {
    const { fbCategoryId } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory/category/${fbCategoryId}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `fbSubCategory with ID ${fbCategoryId} not found` },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(
      `Error fetching fbSubCategory with ID ${params.fbCategoryId}:`,
      error
    );
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
