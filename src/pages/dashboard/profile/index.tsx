import { Profile } from '@src/components/profile';
import withSession from '@src/lib/withSession';

export const getServerSideProps = withSession(async ({ req, res }) => {
  let user;
  try {
    const token = req.session.get('jwt_token');
    const parts = token.split('.');
    const payload = Buffer.from(parts[1], 'base64').toString('utf-8');
    ({ user } = JSON.parse(payload));
    console.log(user);
    if (!user) {
      throw new Error(`Error parsing user from (payload: ${payload})`);
    }
  } catch (e) {
    console.log(e);
    res.writeHead(307, { Location: '/login' });
    res.end();
    return {
      props: {
        redirect: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
});

const ProfilePage = ({ user }) => {
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
