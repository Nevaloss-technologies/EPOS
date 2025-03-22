import React, { useState } from 'react';
import axios from 'axios';

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setMessage('');
    setError('');
    setFormData({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      if (isSignUp) {
        // Sign Up API Call
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const response = await axios.post('http://localhost:3000/signup', {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password
        });

        setMessage('Signup successful! Please login.');
        setIsSignUp(false);
      } else {
        // Login API Call
        const response = await axios.post('http://localhost:3000/signup/login', {
          email: formData.email,
          password: formData.password
        });

        setMessage('Login successful!');
        console.log('User Data:', response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '12px' }}>
        <h3 className="text-center mb-4">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h3>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {isSignUp && (
            <div className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <span
              className="text-primary"
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
              onClick={toggleForm}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;