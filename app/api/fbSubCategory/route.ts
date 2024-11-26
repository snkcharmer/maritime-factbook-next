import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const fbSubCategoryData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbSubCategoryData),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create fbSubCategory entry' },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/fbSubCategory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const subCategoryId = url.searchParams.get('id');
    const fbCategoryId = url.searchParams.get('fbCategoryId');

    let endpoint;

    if (subCategoryId) {
      endpoint = `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory/${subCategoryId}`;
    } else if (fbCategoryId) {
      endpoint = `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory/category/${fbCategoryId}`;
    } else {
      endpoint = `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory`;
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'No fbSubCategory entries found' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/fbSubCategory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const subCategoryId = url.pathname.split('/').pop();
    const updatedData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory/${subCategoryId}`,
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
        { error: 'Failed to update fbSubCategory entry' },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PATCH /api/fbSubCategory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const subCategoryId = url.pathname.split('/').pop();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fbSubCategory/${subCategoryId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to delete fbSubCategory entry' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/fbSubCategory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
