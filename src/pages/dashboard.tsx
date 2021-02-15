import { Dashboard } from '@src/components/dashboard';
import withSession from '@src/lib/withSession';
import { InferGetServerSidePropsType } from 'next';
import React from 'react';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (!user) {
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
  return (
    <div>
      <h1>Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
