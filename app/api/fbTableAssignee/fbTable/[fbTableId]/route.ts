import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ fbTableId: string }> }
) {
  try {
    const { fbTableId } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTableAssignee/fbTable/${fbTableId}`
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
