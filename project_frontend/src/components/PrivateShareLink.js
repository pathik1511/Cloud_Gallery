import { withRouter } from "react-router";
import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const PrivateShareLink = (props) => {
  //localStorage.setItem('email','a@a.com');
  const user = localStorage.getItem("email");
  const [show, setShow] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const receiverHandler = (event) => {
    setReceiver(event.target.value);
    console.log(receiver);
  };

  const imageHandler = (event) => {
    setImage(event.target.value);
    console.log(image);
  };

  const formData = {
    receiverId: receiver,
    senderId: user,
    imageName: image,
  };

  const dataS = JSON.stringify(formData);

  const privateShareHandler = (event) => {
    event.preventDefault();
    //const url = "";
    const url =
      "https://9obb7wcrkc.execute-api.us-east-1.amazonaws.com/default/shareImage";

    // console.log(result);
    axios
      .post(url, dataS)
      .then((response) => {
        console.log("the response is: " + response.data);
        if (response.status === 200) {
          console.log(response.data);
          setError(response.data);
        } else {
          setError("server error, try again later");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error is" + error.response.data); // => the response payload
        }
      });
    setError("");
  };

  return (
    <div>
      <>
        <Button variant="outline-primary" onClick={handleShow}>
          Share Image
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={privateShareHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Receiver Id</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Id"
                  value={receiver}
                  onChange={receiverHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image Name"
                  value={image}
                  onChange={imageHandler}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <h3>{error}</h3>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default withRouter(PrivateShareLink);
