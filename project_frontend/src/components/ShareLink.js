import { withRouter } from "react-router";
import { Form, Button, Modal,Row,Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const ShareLink = (props) => {
  
  const username = localStorage.getItem("email");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageHandler = (event) => {
    setImage(event.target.value);
    console.log(image);
  };

  const formData = {
    username: username,
    image: image,
  };

  // const dataString = JSON.stringify(formData);
  const shareHandler = (event) => {
    event.preventDefault();
    const url = "http://getlinkbackend-env.eba-dqji7q2a.us-east-1.elasticbeanstalk.com/share/public";
    //const url = "http://localhost:2200/share/public";

    // console.log(result);
    axios
      .post(url, formData)
      .then((response) => {
        console.log("the response is: " + response.data);
        if (response.status === 200) {
          console.log(response.data.success);
          if (response.data.success) {
            setImageUrl("Link: " + response.data.url)
          } else {
            setError(response.data.message);
          }
        } else if (response.status === 500) {
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
      <Button variant="outline-primary" onClick={handleShow}>
        Create Link
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share Your Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={shareHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Name"
                onChange={imageHandler}
              />
              <Form.Text className="text-muted">
              {error}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Link
            </Button>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={imageUrl}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withRouter(ShareLink);
