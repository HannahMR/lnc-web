import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import useLNC from '../hooks/useLNC';
import meme from '../forest.jpg';
import {toPng} from "html-to-image";
// import Marker from 'react-native-image-marker';

const MakeMeme: React.FC = () => {
  const {lnc} = useLNC();
  const [info, setInfo] = useState<any>();

  const [memeImage, setMemeImage] = useState<any>(null);
  const memeRef = useRef(null);

  useEffect(() => {
    if (lnc.isConnected) {
      const sendRequest = async () => {
        const res = await lnc.lnd.lightning.getInfo();
        setInfo(res);
      };
      sendRequest();
    }
  }, [lnc.isConnected, lnc.lnd.lightning]);

  // if (!lnc.isConnected || !info) return null;

  // function makeMeme that convert the image-canvas to image and download it using html-to-image library
  const makeMeme = async () => {
    const body = document.getElementById("root")!;
    const tempImage = await toPng(memeRef?.current || body);

    setMemeImage(tempImage);
  }

  // function downloadMeme that download the image using html-to-image library
  const downloadMeme = async () => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = memeImage;
    link.click();
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div id={"image-canvas"} className={"position-relative w-100 m-auto"} ref={memeRef}>
              <div className={"position-absolute w-100 h-100"} style={{backgroundColor: 'rgba(0,0,0,0.7)'}}/>

              <img
                src={meme}
                alt="meme"
                width="100%"
                height="auto"
              />

              <div
                className={"position-absolute h-100 d-flex flex-grow-1 flex-center align-items-center justify-content-center"}
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <div className={"text-white font-weight-bold text-lg-center w-75"}>
                  Keep smiling, because life is a beautiful thing and there's so much to smile about.
                </div>
              </div>

            </div>
          </Col>
          <Col>
            {memeImage && (
              <img
                src={memeImage}
                alt="meme"
                width="100%"
                height="auto"
              />
            )}
          </Col>
        </Row>
      </Container>

      <div className={"d-flex justify-content-center mt-4"}>
        <Button variant={"danger"} onClick={makeMeme} className={"mr-4"}>
          Generate Meme
        </Button>

        {memeImage && (
          <Button variant={"info"} onClick={downloadMeme}>
            Download Meme Image (PNG)
          </Button>
        )}
      </div>


    </div>
  )
};

export default MakeMeme;
