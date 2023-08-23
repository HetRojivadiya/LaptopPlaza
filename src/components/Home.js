import React, { useState, useEffect } from 'react';
import "./Home.css"

export default function Home({ setAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/products.json"); 
        const jsonData = await response.json();
        setProducts(jsonData.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map(product => (
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
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setAddToCart(prevAddCart => [...prevAddCart, product.id]);
                    alert(`${product.name} Successfully Added`);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
