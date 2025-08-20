import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = 'user@gmail.com';
    const validPassword = 'password123';

    if (email === validEmail && password === validPassword) {
      const user = { 
        email: validEmail,
        password: validPassword,        
       };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/productlist');
    } else {
      alert('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="login-container">
        <h1>Login</h1>

        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: 20, width: 170 }}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
