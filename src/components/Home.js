import React, { useState, useEffect } from 'react';
import "./Home.css"
import { useNavigate } from "react-router-dom";

export default function Home({ login,setLogin }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // State for the product being edited
  const [token,setToken] = useState(null); 
  
  const nav = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
  
    setToken(localStorage.getItem('token'))
    if (token) {
      setLogin(true);
    }
  }, [setLogin, nav]);

  const fetchProducts = () => {
    fetch(`http://localhost:3001/fetch`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        
        const m = data.message;
        console.log(message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const setRedirect = () => {
    nav("/login");
  };



  const addToCart = (product) => {
    console.log(token);
    fetch(`http://localhost:3001/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
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

  // Function to start editing a product
  const startEditingProduct = (product) => {
    setEditingProduct(product);
  };

  // Function to update the edited product
  const updateProduct = (editedProduct) => {
    fetch(`http://localhost:3001/editProduct/${editedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        console.log(`${editedProduct.name} Successfully Updated`);
        // Clear the editing state
        setEditingProduct(null);
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            
            <div className="card custom-card c">
              <img
                 src={process.env.PUBLIC_URL + product.image_url}
                className="card-img-top custom-card-img cci"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => {
                        const editedProduct = { ...editingProduct, name: e.target.value };
                        setEditingProduct(editedProduct);
                      }}
                    />
                  ) : (
                    product.name
                  )}
                </h5>
                <p className="card-text">
                  Price: 
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => {
                        const editedProduct = { ...editingProduct, price: parseFloat(e.target.value) };
                        setEditingProduct(editedProduct);
                      }}
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </p>
                <p className="card-text">
                  RAM: 
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.ram}
                      onChange={(e) => {
                        const editedProduct = { ...editingProduct, ram: e.target.value };
                        setEditingProduct(editedProduct);
                      }}
                    />
                  ) : (
                    product.ram
                  )}
                </p>
                <p className="card-text">
                  Storage: 
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.storage}
                      onChange={(e) => {
                        const editedProduct = { ...editingProduct, storage: e.target.value };
                        setEditingProduct(editedProduct);
                      }}
                    />
                  ) : (
                    product.storage
                  )}
                </p>
                <p className="card-text">
                  Rating: 
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.rating}
                      onChange={(e) => {
                        const editedProduct = { ...editingProduct, rating: parseFloat(e.target.value) };
                        setEditingProduct(editedProduct);
                      }}
                    />
                  ) : (
                    product.rating
                  )}
                </p>
                
                {login ? (
                  <div>
                    {/* <button
                      className='btn btn-primary mr-2'
                      onClick={() => {
                        addToCart(product); 
                      }}
                    >
                      Add To Cart
                    </button> */}
                    {editingProduct && editingProduct.id === product.id ? (
                      <button
                        className='btn btn-success mx-2'
                        onClick={() => updateProduct(editingProduct)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className='btn btn-warning mx-2'
                        onClick={() => startEditingProduct(product)}
                      >
                        Edit Product
                      </button>
                    )}
                  </div>
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
