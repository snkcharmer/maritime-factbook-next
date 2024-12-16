import { IZodValidationError } from "@/types";
import { parseZodErrors } from "@/utils/string";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbTableAssignee/${id}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `fbTableAssignee with ID ${id} not found` },
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
      `${process.env.NEXT_PUBLIC_API_URL}/fbTableAssignee/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updatedData }),
      }
    );
    const data = await response.json();

    if (!data.success) {
      const error = parseZodErrors(data as IZodValidationError);
      return NextResponse.json(error);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
