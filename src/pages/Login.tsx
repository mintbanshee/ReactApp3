// src/pages/Login.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/tasks');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password. Please try again.');
    }
  }

  return (
    <main className="container py-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4 text-center">Welcome Back</h1>

        <form onSubmit={handleLogin} className="w-100">
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
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </main>
  );
} 