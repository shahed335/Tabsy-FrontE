import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link ,useNavigate } from "react-router-dom"; 
import './styles/style6.css';

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", { email, password, fullName });

    fetch("http://localhost:3002/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role: "user",   
        userName: fullName, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          console.log("User signed up:", data.user);
          navigate("/");
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.error("Error signing up:", error));
  };

  return (
    <Container className="sign-up-container d-flex justify-content-center align-items-center vh-100">
      <div className="sign-up-form p-4 border rounded shadow">
        <h3 className="text-center mb-4">Tabsy</h3>
        <h5 className="text-center mb-3">Sign Up</h5>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name..."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </small>
        </div>
      </div>
    </Container>
  );
};

export default SignUpForm;
