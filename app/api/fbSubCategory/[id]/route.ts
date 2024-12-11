import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory/${id}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `fbSubCategory with ID ${id} not found` },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const updatedData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory/${id}`,
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
        { error: `Failed to update fbSubCategory with ID ${id}` },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to delete fbSubCategory with ID ${id}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
