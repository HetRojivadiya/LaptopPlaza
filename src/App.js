import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import About from "./components/About"
import MyCart from "./components/MyCart";
import React, { useState } from 'react';

function App() {
  const [addCart, setAddToCart] = useState([]);
  return (
    <BrowserRouter>
    <Header/>
    <Routes> 
      <Route path="/" element={<Home setAddToCart={setAddToCart}/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/mycart" element={<MyCart addCart={addCart} />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
