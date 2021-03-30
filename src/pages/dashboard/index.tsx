import { Dashboard } from '@src/components/dashboard';
import { LogoutBtn } from '@src/components/LogoutBtn';
import withSession from '@src/lib/withSession';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';

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

  let userData;

  try {
    const response = await fetch(`http://nestjs:3000/users/${user.id}`, {
      method: 'GET',
    });
    userData = await response.json();
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      userData,
    },
  };
});

const DashboardPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi {props.userData?.firstName}, congratulations on making it this far! </p>
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
