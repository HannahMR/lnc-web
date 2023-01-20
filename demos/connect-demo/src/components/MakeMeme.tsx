import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, Row, Table} from 'react-bootstrap';
import useLNC from '../hooks/useLNC';
import meme from '../nagging-node.jpg';
import {toPng} from "html-to-image";

const MakeMeme: React.FC = () => {
  const {lnc} = useLNC();
  const [info, setInfo] = useState<any>();

  const [generating, setGenerating] = useState(false);
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

  if (!lnc.isConnected || !info) return null;

  // function makeMeme that converts the image-canvas to image and download it using html-to-image library
  const makeMeme = async () => {
    // Show loading
    setGenerating(true);

    // Convert the image-canvas to image
    const body = document.getElementById("root")!;
    const tempImage = await toPng(memeRef?.current || body);

    // Hide loading
    setGenerating(false);

    // Save the image
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
      <Form className={"w-50 mx-auto text-center bg-light p-3 my-3"}>
        <Button variant={"danger"} onClick={makeMeme} disabled={!info.alias || generating} className={"mr-4"}>
          {generating ? "Generating..." : "Generate"}
        </Button>
      </Form>

      <div
        style={{
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <div
          ref={memeRef}
          id={"image-canvas"}
          className={`m-auto position-relative`}
          style={{width: 1000}}
        >
          <div className={"position-absolute w-100 h-100"} style={{backgroundColor: 'rgba(0,0,0,0)'}}/>

          <img
            src={meme}
            alt="meme"
            width="100%"
            height="auto"
          />

          <div
            className={"position-absolute d-flex flex-grow-1 flex-center align-items-center justify-content-center"}
            style={{
              top: 235,
              left: 40,
            }}
          >
            <div className={"text-black font-weight-bold text-xl-left w-100"} style={{fontSize: 40}}>
              {info.alias}
            </div>
          </div>
        </div>
      </div>

      <div className={"text-center w-50 m-auto"}>
        {memeImage && (
          <img
            src={memeImage}
            alt="meme"
            width="100%"
            height="auto"
          />
        )}
      </div>

      <div className={"d-flex justify-content-center mt-4"}>
        {memeImage && (
          <Button variant={"info"} onClick={downloadMeme}>
            Download Image (PNG)
          </Button>
        )}
      </div>


    </div>
  )
};

export default MakeMeme;
