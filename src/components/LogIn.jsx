import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  
const login = async () => {
  try {
    const res = await fetch("http://localhost:3002/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();  
      console.log("Server response data:", data); 
      onLogin(data.user);  
      navigate("/");  
    } else {
      
      const data = await res.json();  
      setError(data.message);
    }
  } catch (err) {
    setError("Error connecting to the server.");  
    console.error("Error:", err);
  }
};

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Tabsy</h3>
        <h5 className="text-center mb-3">Login</h5>

    
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
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

          <Button variant="primary" onClick={login} className="w-100">
            Login
          </Button>

          <div className="text-center mt-3">
            <small>
              Don't have an account?{" "}
              <Button variant="link" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </small>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
