import auth0 from './utils/auth0';

export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res);
    const session = await auth0.getSession(res);
    //console.log(session)
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}