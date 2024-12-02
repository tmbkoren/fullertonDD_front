import { Authenticator } from 'remix-auth';
import { sessionStorage } from '~/services/session.server';

import { GoogleStrategy } from 'remix-auth-google';
import { User } from '~/util/types';



export const authenticator = new Authenticator<User>(sessionStorage);

let callbackUrl = 'http://localhost:5173/auth/';

if (process.env.NODE_ENV === 'production') {
  callbackUrl = 'https://fullerton-dd-front.vercel.app/auth/';
}

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: callbackUrl + 'google/callback',
  },
  async ({ profile, extraParams }) => {
    const res = await fetch(process.env.BACKEND_DEV_URL + '/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: extraParams.id_token,
        email: profile.emails[0].value,
      }),
    });
    const user = await res.json();
    console.log(res)
    console.log('TARKOV: ', user);
    return user.token;
  }
);

authenticator.use(googleStrategy);
