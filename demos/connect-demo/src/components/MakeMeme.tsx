import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, Row, Table} from 'react-bootstrap';
import meme from '../nagging-node.jpg';
import {toPng} from "html-to-image";

const MakeMeme: React.FC = () => {

  const [generating, setGenerating] = useState(false);
  const [memeImage, setMemeImage] = useState<any>(null);
  const [memeText, setMemeText] = useState<any>(null);
  const memeRef = useRef(null);

  // function makeMeme that convert the image-canvas to image and download it using html-to-image library
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label><strong>Write your LNC Node here</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Paste your node alias here, then click generate"
            onChange={(e) => setMemeText(e.target.value)}
          />
        </Form.Group>

        <Button variant={"danger"} onClick={makeMeme} disabled={!memeText || generating} className={"mr-4"}>
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
              {memeText}
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
