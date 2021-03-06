import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../navbar/navbar";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Container from 'react-bootstrap/Container';
import "./profile-update.css";

export function ProfileUpdate(props) {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [birthdate, updateBirthdate] = useState("");

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  // const [birthdateErr, setBirthdateErr] = useState({});

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");

    const isValid = formValidation();

    if (isValid) {
      axios
        .put(
          `https://myflix2020.herokuapp.com/users/${userId}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          const data = res.data;
          localStorage.setItem("user", data.Username);
          alert("Your profile was successfully updated.");
          window.open("/users/:userId", "_self");
        })
        .catch((e) => {
          console.log("error registering user");
          alert(
            "There was an error updating your profile. Please make sure all fields are completed with accurate information."
          );
        });
    }
  };

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    // const birthdateErr = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameErr.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordErr.passwordMissing = "You must enter a password";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailErr.emailNotEmail = "A valid email address is required";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
  };


  let userId = localStorage.getItem("user");

  return (
    <>
      <NavBar />
      <div className="profile-update">
        <Form className="update-form">
          <h3>Update Your Profile</h3>
          <Form.Group controlId="formBasicUsername" className="update-item">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              value={username}
              className="input"
              // placeholder="Update Username"
              onChange={(e) => updateUsername(e.target.value)}
            />
            {/* <Form.Text className="text-muted">Must be alphanumberic and have a minimum of 5 characters.</Form.Text> */}
            {Object.keys(usernameErr).map((key) => {
              return (
                <div
                  className="validation-error reg-error"
                  key={key}
                 
                >
                  {usernameErr[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="update-item">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              value={password}
              className="input"
              // placeholder="Update Password"
              onChange={(e) => updatePassword(e.target.value)}
            />
            {/* <Form.Text className="text-muted">Suggested that password have at least 8 characters.</Form.Text> */}
            {Object.keys(passwordErr).map((key) => {
              return (
                <div
                  className="validation-error reg-error"
                  key={key}
                  
                >
                  {passwordErr[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="update-item">
            <Form.Label>Email Address: </Form.Label>
            <Form.Control
              type="email"
              className="input"
              // placeholder="Update Email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
            />
            {Object.keys(emailErr).map((key) => {
              return (
                <div
                  className="validation-error reg-error"
                  key={key}
                  
                >
                  {emailErr[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formBasicBirthdate" className="update-item">
            <Form.Label>Date of Birth: </Form.Label>
            <Form.Control
              type="date"
              className="input"
              placeholder="YYYY-MM-DD"
              value={birthdate}
              onChange={(e) => updateBirthdate(e.target.value)}
            />
          </Form.Group>

          <div className="btns-update">
            <button
              type="submit"
              className="button-update-profile"
              onClick={handleUpdate}
            >
              SUBMIT
            </button>
            <Link to={`/users/${userId}`}>
              <button className="button-cancel">CANCEL</button>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}

ProfileUpdate.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.instanceOf(Date).isRequired,
  }),
};
