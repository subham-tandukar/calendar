import { NextResponse, NextRequest } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
  console.log("running");
  
  const { url } = request;


  // Check if the URL matches the one you want to redirect
  if (url === '/api/auth/signin') {
    // Redirect to /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the URL doesn't match, continue to the next middleware
  return NextResponse.next();
}

// Configuration object
export const config = {};
