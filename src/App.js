import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import About from "./components/About"
import MyCart from "./components/MyCart";
import Login from "./components/Login";
import React, { useState } from 'react';


function App() {
  const [addCart, setAddToCart] = useState([]);
  const [login, setLogin] = useState(false);
  return (
    <BrowserRouter>
    <Header/>
    <Routes>                                                                 
      <Route path="/" element={<Home setAddToCart={setAddToCart} login={login}/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/mycart" element={<MyCart addCart={addCart} />} />
      <Route path="/login" element={<Login setLogin={setLogin}/>} />
    </Routes>
    <Footer/>
    
    </BrowserRouter>
  );
}

export default App;
