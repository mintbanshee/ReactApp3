// src/pages/Register.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Something went wrong. Please try again.');
    }
  }

  return (
    <main className="container py-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4 text-center">Create an Account</h1>

        <form onSubmit={handleRegister} className="w-100">
          <input 
            className="form-control mb-3"
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            className="form-control mb-3"
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary w-100" type="submit">Register</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
  
} 
