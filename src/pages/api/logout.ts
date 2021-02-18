import withSession from '@src/lib/withSession';
import { NextApiResponse } from 'next';

export default withSession(async (req, res: NextApiResponse) => {
  req.session.destroy();
  res.send('Logged out');
});
