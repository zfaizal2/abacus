import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0(
    {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_SECRET,
  scope: 'openid profile',
  redirectUri: process.env.callbackURI,
  postLogoutRedirectUri: process.env.redirectURI,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET,
    cookieLifetime: 7200,
    storeIdToken: false,
    storeRefreshToken: false,
    storeAccessToken: false
  }
});