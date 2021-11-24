import { Contract } from '@ethersproject/contracts';
// import { formatEther } from '@ethersproject/units';

import React, { useEffect, useState } from 'react';
import { Button, User, Note, Spacer, Page, Grid  } from '@geist-ui/react';

// import { Body, Header, Image, Link, } from './components';
import Input from './components/input';


import useWeb3Modal from './hooks/useWeb3Modal';
import { addresses, abis } from '@project/contracts';


function WalletButton({ provider, loadWeb3Modal, rocketeer, setRocketeer }) {
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    async function fetchAccount() {
      console.log(provider);
      try {
        if (!provider) {
          return;
        }

        // Load the user's accounts.
        const accounts = await provider.listAccounts();

        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(accounts[0]);
        setName(name);
        setAddress(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAccount();
  }, [provider]);

  useEffect(() => {
    async function fetchRocketeer() {
      try {
        if (!address) {
          return;
        }
        const rocketeerErc721 = new Contract(addresses.rocketeerErc721, abis.erc20, provider);

        const tokenId = await rocketeerErc721.tokenOfOwnerByIndex(address, 0);
        const rocketeerResponse = await fetch(
          `https://rocketeer.fans/api/rocketeer/${tokenId.toString()}`
        );
        const data = await rocketeerResponse.json();
        const { image } = data;
        setRocketeer(image);
      } catch (err) {
        setRocketeer('');
        console.log(err);
      }
    }
    fetchRocketeer();
  }, [address, provider, setRocketeer]);

  if (provider && address) {
    return (
      <User src={rocketeer} name={name}>
        <User.Link href={`https://etherscan.io/address/${address}`}>
          {address.substring(0, 6) + '...' + address.substring(36)}
        </User.Link>
      </User>
    );
  }
  return <Button onClick={loadWeb3Modal}>{'Connect Wallet'}</Button>;
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [rocketeer, setRocketeer] = useState(null);

  return (
    <Page>
      <Page.Header>
        <Grid.Container justify='flex-end'>
          <Grid>
            <Spacer h={1} />
            <WalletButton
              rocketeer={rocketeer}
              setRocketeer={setRocketeer}
              provider={provider}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
            />
          </Grid>
        </Grid.Container>
      </Page.Header>
      <Page.Content>
        <NotAuthorized authorized={rocketeer} />
        <Input disabled={!rocketeer} rocketeer={rocketeer} setRocketeer={setRocketeer} />
      </Page.Content>
    </Page>
  );
}

const NotAuthorized = ({ authorized }) => {
  if (authorized) {
    return null;
  }
  return (
    <>
      <Note type='error'>
        You need a rocketeer NFT to vote. Please switch accounts or get one{' '}
        <a href='https://mint.rocketeer.fans/'>here</a>
      </Note>
      <Spacer h={1} />
    </>
  );
};
export default App;
