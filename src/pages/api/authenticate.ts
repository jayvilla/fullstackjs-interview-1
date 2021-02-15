import withSession from '@src/lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

export default withSession(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      res.status(405).end();
    }

    const { email, password } = req.body;

    // Todo authenticate email/password
    // if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    //   req.session.set('user', { email });
    //   await req.session.save();
    //   console.log(req.session.get());
    //   return res.status(201).send('');
    // }
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
});
