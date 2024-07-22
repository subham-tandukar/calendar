import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async  function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
  const { pathname, searchParams } = new URL(request.url, `${process.env.NEXT_PUBLIC_LIVE_URL}/`);

  // Redirect to login if accessing the profile page without a valid token
  if ((pathname === '/profile' || pathname === '/reminder' || pathname === '/edit-profile') && !token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LIVE_URL}/`);
  }

  if (pathname === '/api/auth/signin' && (searchParams.get('error') === 'Callback' || searchParams.get('error') === 'OAuthSignin')) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LIVE_URL}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/reminder', '/edit-profile', '/'],
};