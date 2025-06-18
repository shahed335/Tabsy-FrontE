import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    packSize: '',
    stockQuantity: '',
    Pimage: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    fetchProductData(); 
  }, []);

  const fetchProductData = async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/product/${id}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          productName: data.productName,
          description: data.description,
          price: data.price,
          packSize: data.packSize,
          stockQuantity: data.stockQuantity,
          Pimage: data.Pimage || '' 
        });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError('Failed to fetch product data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, Pimage: e.target.files[0] });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  
  console.log('Form data being sent:', formData);

  if (!formData.productName || !formData.description || !formData.price || !formData.packSize || !formData.stockQuantity) {
    setError('Please fill all fields.');
    return;
  }

  const dataToSend = {
    productName: formData.productName,
    description: formData.description,
    price: formData.price,
    packSize: formData.packSize,
    stockQuantity: formData.stockQuantity,
    Pimage: formData.Pimage,
  };

  try {
    const res = await fetch(`http://localhost:3002/api/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-role': 'admin',
      },
      body: JSON.stringify(dataToSend),
    });

    const data = await res.json();
    console.log('Response data:', data); 
    if (res.ok) {
      navigate(`/product/${id}`);
    } else {
      setError(data.message);
    }
  } catch (error) {
    console.error('Error updating product:', error);
    setError('An error occurred while updating the product.');
  }
};


  const handleCancel = () => {
    navigate(`/shop`); 
  };

  return (
    <Container className="mt-5">
      <h2>Update Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pack Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product pack size"
            name="packSize"
            value={formData.packSize}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock quantity"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}  // Handle the file input change
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleCancel} className="ml-2">
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
