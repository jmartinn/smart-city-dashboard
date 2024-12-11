import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth/auth';

export default auth(req => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname.startsWith('/login');

  if (isOnLoginPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
