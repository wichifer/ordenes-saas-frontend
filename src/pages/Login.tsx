import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { api } from '../api/api';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

const handleLogin = async () => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
console.log(response.data.usuario);
    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "usuario",
      JSON.stringify(response.data.usuario)
    );

    // redireccionar
    navigate("/saas/empresas");

    } catch (error: any) {
      console.error(
        "Error login:",
        error.response?.data
      );
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