import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './styles/style3.css'; 

const ProductList = ({ userRole }) => {
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
      console.log(data);
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

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3002/api/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-role': 'admin', 
        },
      });
      
      const data = await res.json();
      if (res.ok) {
        setProducts(products.filter((product) => product.productId !== productId)); 
        alert('Product deleted successfully');
      } else {
        alert(data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product');
    }
  };


  const handleUpdate = (productId) => {
    console.log("Updating product with ID:", productId);
     navigate(`/product/${productId}/edit`);
     
  };
  const handleAddProduct = () => {
    navigate("/add-product"); 
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

              
                {userRole === 'admin' && (
                  <>
                    <Button variant="warning" onClick={() => handleUpdate(product.productId)} className="ml-2">
                      Update
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(product.productId)} className="ml-2">
                      Delete
                    </Button>
                  </>
                   )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {userRole === 'admin' && (
        <Button variant="success" onClick={handleAddProduct} className="mt-4">
          Add Product
        </Button>
      )}

    </div>
  );
};

export default ProductList;
