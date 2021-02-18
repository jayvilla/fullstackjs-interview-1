import withSession from '@src/lib/withSession';
import { NextApiResponse } from 'next';
import getConfig from 'next/config';

const { BASE_API_URL } = getConfig().serverRuntimeConfig;

export default withSession(async (req, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      res.status(405).end();
    }

    const { email, password } = req.body;

    const response = await fetch(BASE_API_URL + '/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (response.ok) {
      // req.session.set('user', { email });
      req.session.set('jwt_token', json.access_token);
      await req.session.save();
      // console.log(req.session.get());
      return res.status(201).send(json);
    } else {
      res.status(response.status).send(json);
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: e.message });
  }
});
