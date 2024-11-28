import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const provider = params.provider as string;
  return await authenticator.authenticate(provider, request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
};
