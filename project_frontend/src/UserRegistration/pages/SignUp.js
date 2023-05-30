import { withRouter } from "react-router";
import Header from "../components/Header.js";
import { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    pwd: "",
    confirmPwd: "",
    question: "",
    answer: ""
  });

  const dataS = {
    email:formData.email,
    phone:formData.phone,
    pwd:formData.pwd
  }

  const [error, setError] = useState("");

  // getting the input value of sign up form.
  const formHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value.toString();
    setFormData({ ...formData, [name]: value });
  };

 // validating the information filled by user in form.
  const signUpValidation = (event) => {
    event.preventDefault();

    if (formData.email.trim() === "") {
      setError("Please Enter E-mail.");
    } else if (
      !/([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z])/.test(
        formData.email
      )
    ) {
      setError("Enter Valid Email");
    } else if (formData.phone.length < 10){
      setError("Please Enter Valid Phone Number.");
    }
    else if (formData.pwd.trim().length < 1) {
      setError("Password should be of min 8 characters.");
    } else if (
      /[^A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(formData.pwd)
    ) {
      setError(
        "Password should only contain alpha-numeric and special characters."
      );
    } else if (formData.confirmPwd.trim().length < 1) {
      setError("Enter confirm Password.");
    } else if (formData.pwd !== formData.confirmPwd) {
      setError("Passwod do not match");
    } else if (formData.question.trim() === "") {
      setError("Please Enter Question");
    } else if (/[^a-zA-Z]/.test(formData.question)) {
      setError("Question should have alphabets only.");
    } else if (formData.answer.trim() === "") {
      setError("Please Enter Answer.");
    } else if (/[^a-zA-Z0-9]/.test(formData.answer)) {
      setError("Answer accepts aplhabets only.");
    } else {
      const url = "https://ojamq0iz25.execute-api.us-east-1.amazonaws.com/signUpAPI/signup";

      axios.post(url, dataS)
        .then(function (response) {
          console.log("the response is: "+response);
          if (response.status === 200) {
            console.log(response.status);
            console.log(response.data);
            if (response.data.success) {
              props.history.push({
                pathname: "/",
              });
            } else {
              setError("Server error");
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // setFormData({
    //   email: "",
    //   phone: "",
    //   pwd: "",
    //   confirmPwd: "",
    //   question: "",
    //   answer: ""
    // });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-md-center">
        <Card style={{ width: '30rem', margin:'2rem'}}>
            <Card.Body>
            <Card.Title className="text-center">Sign Up</Card.Title>
            <form onSubmit={signUpValidation}>
              <div className="container">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.email}
                    name="email"
                    placeholder="E-mail"
                    onChange={formHandler}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.phone}
                    name="phone"
                    placeholder="Phone Number"
                    onChange={formHandler}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.pwd}
                    name="pwd"
                    placeholder="Password"
                    onChange={formHandler}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.confirmPwd}
                    name="confirmPwd"
                    placeholder="Confirm Password"
                    onChange={formHandler}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter Security Question</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.question}
                    name="question"
                    placeholder="Security Question"
                    onChange={formHandler}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.answer}
                    name="answer"
                    placeholder="Answer"
                    onChange={formHandler}
                  />
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

export default withRouter(SignUp);
