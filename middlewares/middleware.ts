import { ROUTES } from '@/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Retrieve token from cookies
  const token = req.cookies.get('authToken')?.value;
  const url = req.nextUrl.clone();

  // Define public and protected routes
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  // Redirect logic for protected and public routes
  if (!token && !isPublicPath) {
    url.pathname = ROUTES.login;
    return NextResponse.redirect(url);
  }

  if (token && isPublicPath) {
    url.pathname = ROUTES.dashboard;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*'],
};
