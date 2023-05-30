import { withRouter } from "react-router";
import UserHeader from "../components/UserHeader";
import { SRLWrapper } from "simple-react-lightbox";
import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import React from "react";
import SimpleReactLightbox from "simple-react-lightbox";

const options = {};

const Gallery = () => {
  const [type, setType] = useState("library");
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const user = localStorage.getItem("email");

  //Get username from props
  // useEffect(() => {
  // 	setUserName(this.props.username);
  // }, [this.props.username])

  useEffect(() => {
    // GET request using fetch

    // use props to access username
    //fetch('https://j8wefl5kw3.execute-api.us-east-1.amazonaws.com/default/getImages?username='+username)
    fetch(
      "https://j8wefl5kw3.execute-api.us-east-1.amazonaws.com/default/getImages?username="+user
    )
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  useEffect(() => {
    setFilteredImages(images[type]);
    console.log(images);
  }, [type, images]);

  const TagButton = ({ name, handleSetType, typeStatus }) => {
    return (
      <Button variant="outline-primary" onClick={() => handleSetType(name)}>
        {name.toUpperCase()}
      </Button>
      //   <button
      //     className={`nav-item ${typeStatus ? "active" : null}`}
      //     onClick={() => handleSetType(name)}
      //   >
      //     {name.toUpperCase()}
      //   </button>
    );
  };
  return (
    <>
      <UserHeader />
      {/* <div className="navbar">
          <TagButton
            name="library"
            tagActive={type === "library" ? true : false}
            handleSetType={setType}
          />{" "}
          
          <TagButton
            name="share_lib"
            tagActive={type === "share_lib" ? true : false}
            handleSetType={setType}
          />{" "}
          
        </div> */}
      <div style={{ margin: "25px" }}>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <TagButton
              name="library"
              tagActive={type === "library" ? true : false}
              handleSetType={setType}
            />
          </Col>
          <Col xs lg="2">
            <TagButton
              name="share_lib"
              tagActive={type === "share_lib" ? true : false}
              handleSetType={setType}
            />
          </Col>
        </Row>
      </div>
      <React.StrictMode>
        <SimpleReactLightbox>
          <SRLWrapper options={options}>
            <div className="container">
              <Row xs={1} md={4} className="g-4">
                {filteredImages &&
                  filteredImages.map((image, idx) => {
                    return (
                      <Col key={idx}>
                        <Card style={{ width: "18rem" }}>
                          <a
                            href={`https://dalphotosharing.s3.amazonaws.com/${image[type]}`}
                          >
                            <Card.Img
                              variant="top"
                              src={`https://dalphotosharing.s3.amazonaws.com/${image[type]}`}
                              alt={`Name: ${image[type]}`}
                              style={{ height: "250px" }}
                            />
                          </a>
                          {/* <Card.Body>
                            <Card.Title>{image[type]}</Card.Title>
                          </Card.Body> */}
                        </Card>
                        {/* <div className="image-card">
                        <a
                          href={`https://dalphotosharing.s3.amazonaws.com/${image[type]}`}
                        >
                          <img
                            className="image"
                            src={`https://dalphotosharing.s3.amazonaws.com/${image[type]}`}
                            alt={`Name: ${image[type]}`}
                          />
                        </a>
                      </div> */}
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </SRLWrapper>
        </SimpleReactLightbox>
      </React.StrictMode>
    </>
  );
};

export default withRouter(Gallery);
