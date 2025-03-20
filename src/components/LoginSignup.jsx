import React, { useState } from 'react';


const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '12px' }}>
        <h3 className="text-center mb-4">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h3>
        <form>
          {isSignUp && (
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Full Name" />
            </div>
          )}
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          {isSignUp && (
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Confirm Password" />
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

        <div className="mt-3 text-center">
          <button className="btn btn-outline-secondary w-100">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
