import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import './styles/style4.css';

const ProductDetail = () => {
  
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3002/api/product/${id}`);
        const data = await res.json();
        setProduct(data); 
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToOrder = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.productId,  
          amount: product.price,         
          orderDate: new Date().toISOString().split('T')[0], 
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Order successfully placed!'); 
        console.log('Order successfully placed:', result);
       
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:3002${product.Pimage}`}
            alt={product.productName}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h1 className="product-title">{product.productName}</h1>
          <p className="product-price">{product.price} JD</p>
          <div className="product-meta">
           <div>Pack Size: {product.packSize}</div>
            <div>Stock: {product.stockQuantity}</div>
          </div>
          <div className="product-description">
            <span>Description:</span>
            <p>{product.description}</p>
          </div>
          <button className="btn btn-primary add-to-cart" onClick={handleAddToOrder} >ADD</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
