import React from 'react';
import Page from '../components/Page';
import MakeMeme from '../components/MakeMeme';

const Home: React.FC = () => {


  return (
    <Page>
      <h2 className="text-center">Welcome to lnc-web</h2>
      <MakeMeme />
    </Page>
  );
};

export default Home;
