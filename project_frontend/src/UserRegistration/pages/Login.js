import axios from "axios";
import { useState } from "react";
import { withRouter } from "react-router";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formData = {
    email: email,
    password: password
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  // validating the user email and password.

  function loginValidation(event) {
    event.preventDefault();

    // email validation.

    if (email.trim() === "") {
      setError("Please Enter E-mail.");
    } else if (
      !/([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z])/.test(email)
    ) {
      setError("Enter Valid Email");
    }

    // passowrd validation.
    else if (password.trim().length < 1) {
      setError("Password should be of min 8 characters.");
    } else if (/[^A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password)) {
      setError(
        "Password should only contain alpha-numeric and special characters."
      );
    }

    // authenticating the user, and routing to next page if authenticated.
    else {
      const url = "https://81p3boj36d.execute-api.us-east-1.amazonaws.com/loginAPI/login";
      //const url = "http://localhost:2000/api/users/login";
      console.log("entered in else");
      console.log(formData);
      axios.post(url, formData).then((response) => {
        console.log("the response is: " + response);

        if (response.status === 200) {
          localStorage.setItem("email", email);
          props.history.push({
            pathname: "/home",
          });
        } else if (response.status === 500) {
          setError("server error, try again later");
        } else if (response.status === 204) {
          console.log(response.data.success);
          setError("email and password do not match");
        }
      });
    }
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-md-center">
          <Card style={{ width: '30rem', margin:'2rem'}}>
            <Card.Body>
            <Card.Title className="text-center">Login</Card.Title>
            <form onSubmit={loginValidation}>
              <div className="container">
                <div className="form-group" style={{margin:'1rem'}}>
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={emailHandler}
                  />
                </div>
                <div className="form-group" style={{margin:'1rem'}}>
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={passwordHandler}
                  />
                </div>
                <div className="text-center">
                  <NavLink
                    className="navbar-item"
                    activeClassName="is-active"
                    to="/resetPassword"
                  >
                    Forgot Password ?
                  </NavLink>
                </div>
                <div className="text-center">
                  <h6 style={{ color: "blue" }}>{error}</h6>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <h1></h1>
                </div>
              </div>
            </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
