import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useLNC from '../hooks/useLNC';
import meme from '../forest.jpg';
// import Marker from 'react-native-image-marker';

const MakeMeme: React.FC = () => {
  const { lnc } = useLNC();
  const [info, setInfo] = useState<any>();

  useEffect(() => {
    if (lnc.isConnected) {
      const sendRequest = async () => {
        const res = await lnc.lnd.lightning.getInfo();
        setInfo(res);
      };
      sendRequest();
    }
  }, [lnc.isConnected, lnc.lnd.lightning]);

  if (!lnc.isConnected || !info) return null;



  return (
    <>
      <h4 className="mt-5">Your meme</h4>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Node</th>
            <th>Meme</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{info.alias}</td>
            <td>
              <img
              alt="logo"
              src={meme}
              width="800"
              height="500"
              className="d-inline-block align-top"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default MakeMeme;
