import './App.css';
import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OpeningPage from './components/OpeningPage.jsx';
import ProductList from './components/ProductList.jsx'; 
import ProductDetail from './components/ProductDetail.jsx';
import MedicationList from './components/MedicationList.jsx';
import APIinteraction from './components/APIinteraction.jsx';
import SignUp from './components/SignUp.jsx'; 
import LogIn from './components/LogIn.jsx'; 
import AddProduct from './components/AddProduct.jsx';
import UpdateProduct from './components/UpdateProduct';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [userRole, setUserRole] = useState(null); 

  const handleLogin = (user) => {
    setUserRole(user.role);
    console.log("User role after login:", user.role);
  };

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={userRole ? <OpeningPage /> : <LogIn onLogin={handleLogin} />} />
        <Route path="/shop" element={<ProductList userRole={userRole} />} />
        <Route path = "/list" element = {<MedicationList />} />
        <Route path = "/interaction" element = {<APIinteraction />} />
        <Route path="/product/:id" element={<ProductDetail />} /> 

        <Route path="/product/:id/edit" element={<UpdateProduct />} />
        <Route path="/add-product" element={<AddProduct />} />

        <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
