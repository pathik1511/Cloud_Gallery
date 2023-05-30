import { within } from "@testing-library/react";
import { withRouter } from "react-router";
import { Tab, Tabs } from "react-bootstrap";
import ShareLink from "./ShareLink";
import PrivateShareLink from "./PrivateShareLink";
import Upload from "./Uploader";

const FunctionTab = (props) => {
  return (
    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        <ShareLink />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <PrivateShareLink />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <Upload/>
      </Tab>
    </Tabs>
  );
};

export default withRouter(FunctionTab);
