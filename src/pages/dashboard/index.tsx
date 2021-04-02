import { Dashboard } from '@src/components/dashboard';
import { LogoutBtn } from '@src/components/LogoutBtn';
import withSession from '@src/lib/withSession';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { useUser } from '../../hooks';

export const getServerSideProps = withSession(async ({ req, res }) => {
  let user;
  try {
    const token = req.session.get('jwt_token');
    const parts = token.split('.');
    const payload = Buffer.from(parts[1], 'base64').toString('utf-8');
    ({ user } = JSON.parse(payload));
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

const DashboardPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const user = useUser(props.user.id);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi {user?.firstName}, congratulations on making it this far! </p>
      <Link href='/dashboard/profile'>
        <a className='linkToProfile'>Edit Profile</a>
      </Link>
      <Dashboard />
      <div style={{ marginTop: 20 }}>
        <LogoutBtn>Logout</LogoutBtn>
      </div>
    </div>
  );
};

export default DashboardPage;
