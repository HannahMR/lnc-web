import React from 'react';
// import GetInfo from '../components/GetInfo';
import Page from '../components/Page';
import MakeMeme from '../components/MakeMeme';
import useLNC from '../hooks/useLNC';

const Home: React.FC = () => {
  const { lnc } = useLNC();

  return (
    <Page>
      <h2 className="text-center">Welcome to the LNC meme generator</h2>
      <p className="text-center">
        {lnc.isConnected
          ? 'You are now connected to your Lightning node.'
          : 'Connect or Login to generate a custom meme!'}
      </p>
      <p className="text-center">
        {lnc.isConnected
          ? ' '
          : '!!!Please connect testnet nodes using the read-only option!!!  Instructions -> docs.lightning.engineering'}
      </p>
      <MakeMeme />
    </Page>
  );
};

export default Home;
