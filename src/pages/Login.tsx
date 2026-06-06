import { useState } from 'react';
import { api } from '../api/api';

export default function Login() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleLogin = async () => {

    try {

      const response =
        await api.post(
          '/auth/login',
          {
            email,
            password,
          },
        );

      console.log(response.data,);


      localStorage.setItem(
        'token',
        response.data.token,
        
      );
      window.location.href = '/dashboard';

      alert('Login correcto');
      

    } catch {

      alert('Error de login');

    }

  };

  return (

    <div>

      <h1>Login</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value,
          )
        }
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value,
          )
        }
      />

      <button
        onClick={handleLogin}
      >
        Ingresar
      </button>

    </div>

  );

}