import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './styles/style3.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProducts();  
  }, []);  

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3002/api/product"); 
      const data = await res.json();
      setProducts(data);  
      setLoading(false);  
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);  
    }
  };

  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); 
  };

  if (loading) {
    return <div>Loading products...</div>;  
  }

  return (
    <div className="text-center mt-5">
      <h1 className="mb-4 text-primary">Your Trusted Online Pharmacy</h1>
      
      <Row>
        {products.map((product) => (
          <Col key={product.productId} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`http://localhost:3002${product.Pimage}`} alt={product.productName} />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>Price: {product.price} JD</Card.Text>
                <Button variant="primary" onClick={() => handleProductClick(product.productId)}>
                  View Details
                </Button> 
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
