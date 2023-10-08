import React, { useState, useEffect } from 'react';
import "./Home.css"
import { useNavigate } from "react-router-dom";

export default function Home({ login }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(`http://localhost:3001/fetch`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const nav = useNavigate();

  const setRedirect = () => {
    nav("/login");
  };

  const addToCart = (product) => {
    
  
    fetch(`http://localhost:3001/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        console.log(`${product.name} Successfully Added to Cart`);
        
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card custom-card c">
              <img
                src={product.image_url}
                className="card-img-top custom-card-img cci"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">RAM: {product.ram}</p>
                <p className="card-text">Storage: {product.storage}</p>
                <p className="card-text">Rating: {product.rating}</p>
                <p className="card-text">Available in stock: {product.available_in_stock}</p>
                {login ? (
                  <button
                    className='btn btn-primary'
                    onClick={() => {
                      addToCart(product); 
                    }}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    className='btn btn-primary'
                    onClick={setRedirect}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
