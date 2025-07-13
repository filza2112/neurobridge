// cleint/src/components/AuthModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AuthModal = ({ isOpen, onClose, isSignupMode, setSignupMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const isSignup = isSignupMode;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = isSignup ? '/auth/signup' : '/auth/login';

    try {
      const response = await api.post(url, formData);

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.token);


        localStorage.setItem("userId", response.data.userId);
        onClose();
        navigate("/homepage");
      } else {
        setError('Something went wrong');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Authentication failed';
      setError(message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {isSignup ? 'Create an Account' : 'Welcome Back'}
        </h2>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-accent"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setSignupMode(!isSignup)}
            className="text-accent font-semibold ml-2"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
