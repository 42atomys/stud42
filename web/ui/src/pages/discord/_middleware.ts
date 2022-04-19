import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { JWT } from 'next-auth/jwt';

import { withAuth } from 'next-auth/middleware';
/**
 * The Middleware is only called when the user is not authenticated.
 * (when the method `authorized` returns false)
 */
const middleware: NextMiddleware = async () => {
  return NextResponse.next();
};

/**
 * Define if the current user exists and is authenticated and authorized.
 * When this method returns true, the user is considered authorized, and the
 * next page will be rendered, otherwise the user will be redirected to the
 * login page.
 */
const authorized = async ({}: {
  token: JWT | null;
  req: NextRequest;
}): Promise<boolean> => {
  return true;
};

export default withAuth(middleware, { callbacks: { authorized } });
