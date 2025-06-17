import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpeningPage from './components/OpeningPage.jsx';
import ProductList from './components/ProductList.jsx'; 
import ProductDetail from './components/ProductDetail.jsx';
import MedicationList from './components/MedicationList.jsx';
import APIinteraction from './components/APIinteraction.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path = "/list" element = {<MedicationList />} />
        <Route path = "/interaction" element = {<APIinteraction />} />
        <Route path="/product/:id" element={<ProductDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
