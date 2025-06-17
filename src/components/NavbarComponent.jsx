import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import profileImage from './path-to-profile-image.jpg'; 
import './styles/style2.css'; 

const NavbarComponent = () => {
  return (
    <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="Logo"
            src="path-to-your-logo.png" 
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' '}
          Your Trusted Pharmacy
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#shop">Shop</Nav.Link>
          <Nav.Link href="#list">List</Nav.Link>
          <Nav.Link href="#interaction">Interaction</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#profile">
            <Image
              src={profileImage} 
              alt="Profile"
              roundedCircle
              width="40"
              height="40"
            />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
