import { nextAuthOptions } from '@lib/auth';
import { getActiveTransaction } from '@sentry/browser';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthAction } from 'next-auth';

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // calculate timing to log it into span to analyse it
    const start = Date.now();
    const result = await NextAuth(req, res, nextAuthOptions);
    const end = Date.now();
    const duration = end - start;

    // log the result
    const transaction = getActiveTransaction();
    transaction?.setData('nextauth-duration', duration);
    transaction?.setData('nextauth-action', req.query.action as AuthAction);
    return result;
  } catch (e) {}
};

export default auth;
