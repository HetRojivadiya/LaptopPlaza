import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({ setLogin }) {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true);
      nav('/');
    }
  }, [setLogin, nav]);

  const handleLogin = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Store the token in localStorage
        localStorage.setItem('token', token);
        window.location.reload();
        setLogin(true);
       
      } else {
        // Handle authentication failure here, e.g., show an error message.
        console.error('Authentication failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      // Handle other errors, e.g., show an error message.
    }
  
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card bg-white">
              <div className="card-body p-5">
                <form className="mb-3" onSubmit={handleLogin}>
                  <h2 className="fw-bold">LaptopPlaza.Login</h2>
                  <div className="mb-3 my-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="small">
                    <a className="text-primary" href="forget-password.html">
                      Forgot password?
                    </a>
                  </p>
                  <div className="d-grid">
                    <button className="btn btn-outline-dark" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <div>
                  <p className="mb-0 text-center">
                    Don't have an account?{' '}
                    <a href="signup.html" className="text-primary fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
