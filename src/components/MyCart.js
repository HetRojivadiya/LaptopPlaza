import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

export default function MyCart({ addCart }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (addCart && addCart.length > 0) {
      async function fetchData() {
        try {
          const response = await fetch("/products.json");
          const jsonData = await response.json();
          const allProducts = jsonData.products;

          const selectedProducts = allProducts.filter((product) =>
            addCart.includes(product.id)
          );
          setProducts(selectedProducts);

          let totalPrice = 0;
          for (let i = 0; i < selectedProducts.length; i++) {
            totalPrice += selectedProducts[i].price;
          }
          setTotal(totalPrice.toFixed(2));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  }, [addCart]);

  return (
    <>
      {total === 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-6 my-2" style={{ border: "2px solid black" }}>
              <div className="container mt-1 d-flex justify-content-center align-items-center ">
                <div className="row">
                  <div class="card border-0" style={{ width: "20rem" }}>
                    <img
                      src={process.env.PUBLIC_URL + "/images/cart.jpg"}
                      class="card-img-top mx-4"
                      style={{ width: "80%", height: "80%" }}
                      alt="hg"
                    />
                    <div
                      class="card-body d-flex flex-column align-items-center justify-content-center"
                      style={{ height: "8rem" }}
                    >
                      <h5 class="card-title center mx-4">Your Cart is Empty</h5>
                      <p className="cart-text">
                        Add something to make me happy :)
                      </p>

                      <Link class="btn btn-primary" to="/">Go somewhere</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              </div>
             </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div
              className="col-6 my-2"
              style={{ border: "2px solid black", fontFamily: "sans-serif" }}
            >
              <div className="container ">
                <h1>Payment Details</h1>
                <div className="row">
                  {products.map((product) => (
                    <div key={product.id} className="col-12">
                      <div
                        className=""
                        style={{ display: "flex", marginTop: "-20px" }}
                      >
                        <img
                          src={product.image_url}
                          height={"150px"}
                          width={"150px"}
                          alt={product.name}
                        />
                        <div className="my-5">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">Price: ${product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <div className="mx-4">
                    <h2>Total : ${total}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="container my-2"
                style={{ fontFamily: "cursive", border: "2px solid black" }}
              >
                <div>
                  <h1>Personal Details</h1>
                  <label for="exampleFormControlInput1" class="form-label">
                        Name
                      </label>
                  <div className="d-flex" style={{marginTop:"-22px"}}>
                    <input
                      className="form-control my-4 me-2"
                      type="text"
                      placeholder="First Name"
                      aria-label="default input example"
                      
                    />
                    <input
                      className="form-control my-4"
                      type="text"
                      placeholder="Last Name"
                      aria-label="default input example"
                    />
                  </div>
                  <div className="my-1">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Email address & Contact number
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                      />
                    </div>
                    <input
                      className="form-control my-4 me-2"
                      type="text"
                      placeholder="Contact Number"
                      aria-label="default input example"
                      
                    />
                    <div class="mb-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Address
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                     
                    </div>
                    <button className="btn btn-success">Procced to Pay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
