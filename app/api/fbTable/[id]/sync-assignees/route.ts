import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const updatedData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTable/${id}/sync-assignees`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updatedData }),
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
    return NextResponse.json({ error }, { status: 500 });
  }
}
