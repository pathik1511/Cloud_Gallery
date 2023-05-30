import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import Axios from 'axios'
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { withRouter } from "react-router";

const Uploader = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let imageName = '';
  let username = localStorage.getItem("email") ///////////////// pass local storage username here pathik

  const axios = require("axios").default;

  let API_ENDPOINT ="";
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  

    if(meta.name.toLocaleLowerCase().includes(".jpg")){
      API_ENDPOINT ="https://mj0hp7gd0c.execute-api.us-east-1.amazonaws.com/default/cloudUpload";
    }
    else if(meta.name.toLocaleLowerCase().includes(".png")){
      API_ENDPOINT ="https://xj2z7lh0uf.execute-api.us-east-1.amazonaws.com/default/clouduploadpng";
    }
    else if(meta.name.toLocaleLowerCase().includes(".jpeg")){
      API_ENDPOINT ="https://tgyhruv4uk.execute-api.us-east-1.amazonaws.com/default/clouduploadjpeg";
    }
    else {
      API_ENDPOINT ="https://tjmyu3ejf2.execute-api.us-east-1.amazonaws.com/default/clouduploadgif";
    }


  };

  const handleSubmit = async (files) => {
    const f = files[0];

    // * GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT,
    });

    console.log("Response: ", response);
    imageName = response.data.photoFilename;

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      body: f["file"]
    });
    console.log("Result: ", result);

    // enter values in the rds table
    Axios.post("https://wn9pott3id.execute-api.us-east-1.amazonaws.com/default/imageTableEntry", JSON.stringify({
      username: username,
      library: imageName
    })).then((response) => {
      console.log(response)
    })
      .catch((err) => {
        console.log(err)
      })
      alert("Image upload successful")

  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Upload
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropzone
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            maxFiles={1}
            multiple={false}
            canCancel={false}
            inputContent="Drop A File"
            styles={{
              dropzone: { width: 400, height: 200 },
              dropzoneActive: { borderColor: "green" },
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

<Uploader />;

export default withRouter(Uploader);
