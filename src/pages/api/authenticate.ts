import withSession from '@src/lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { BASE_API_URL } = getConfig().serverRuntimeConfig;

export default withSession(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      res.status(405).end();
    }

    const { email, password } = req.body;

    const response = await fetch(BASE_API_URL + '/users');
    const json = await response.json();
    console.log(json);

    // Todo authenticate email/password
    // if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    //   req.session.set('user', { email });
    //   await req.session.save();
    //   console.log(req.session.get());
    //   return res.status(201).send('');
    // }
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: e.message });
  }
});
