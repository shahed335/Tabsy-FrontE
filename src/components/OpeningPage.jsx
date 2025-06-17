import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import pharmacy1 from './images/pharmacy1.jpg'; 
import interaction from './images/interaction.jpg'; 
import profile from './images/profile.jpg'; 
import './styles/style1.css'; 

function OpeningPage() {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4 text-primary custom-heading">Your Trusted Online Pharmacy</h1> {/* Applying custom class */}
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={pharmacy1} alt="Shop" className="img-responsive"/>
            <Card.Body className="card-body"> {/* Applying Bootstrap class and custom class */}
              <Card.Text>Safe, affordable medications here at your space – Start Shopping</Card.Text>
              <Button variant="primary" className="button-custom" onClick={() => navigate('/shop')}>SHOP</Button> {/* Applying custom button class */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={interaction} alt="Drug Interaction Checker" className="img-responsive"/>
            <Card.Body className="card-body">
              <Card.Text>Do you want to check any medication interaction?</Card.Text>
              <Button variant="primary" className="button-custom" onClick={() => navigate('/interaction')}>CHECK</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={profile} alt="Profile" className="img-responsive"/>
            <Card.Body className="card-body">
              <Card.Text>View and manage your personal information and see your previous history </Card.Text>
              <Button variant="primary" className="button-custom" onClick={() => navigate('/profile')}>GO</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OpeningPage;
