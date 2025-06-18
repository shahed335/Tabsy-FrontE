import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [packSize, setPackSize] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [Pimage, setPimage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!productName || !description || !price || !packSize || !stockQuantity || !Pimage) {
      setError('Please fill all fields.');

      return;
    }

    
    const productData = {

      productName,
      description,
      price,
      packSize,
      stockQuantity,
      Pimage,
    };

    try {
      const res = await fetch('http://localhost:3002/api/product', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-role': 'admin',
        },
        body: JSON.stringify([productData]),
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/shop'); 
      } else {
        setError(data.message); 
      }
    } catch (error) {
      setError('An error occurred while adding the product.');
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pack Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product pack size"
            value={packSize}
            onChange={(e) => setPackSize(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product image URL"
            value={Pimage}
            onChange={(e) => setPimage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
