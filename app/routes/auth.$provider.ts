import { ActionFunctionArgs, redirect } from '@vercel/remix';
import { authenticator } from '~/services/auth.server';

export const loader = () => redirect('/login');

export const action = ({ request, params }: ActionFunctionArgs) => {
  const provider = params.provider || 'google';
  return authenticator.authenticate(provider, request);
};
