import { useState } from 'react';
import { api } from '../../../api/api';

export default function EmpresaForm({
  onEmpresaCreada,
}) {

  const [razonSocial, setRazonSocial] =
    useState('');

  const [cuit, setCuit] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [telefono, setTelefono] =
    useState('');

  const [direccion, setDireccion] =
    useState('');

  const [nombre, setNombre] =
    useState('');

  const [apellido, setApellido] =
    useState('');

  const [usuarioEmail, setUsuarioEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const guardarEmpresa = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        razon_social: razonSocial,
        cuit,
        email,
        telefono,
        direccion,
        nombre,
        apellido,
        usuario_email: usuarioEmail,
        password,
      };

      console.log(payload);

      await api.post(
        '/admin-saas/empresas',
        payload,
      );

      alert('Empresa creada correctamente');

      setRazonSocial('');
      setCuit('');
      setEmail('');
      setTelefono('');
      setDireccion('');
      setNombre('');
      setApellido('');
      setUsuarioEmail('');
      setPassword('');

      onEmpresaCreada();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        'Error al crear empresa'
      );
    }
  };

  return (

    <form
      onSubmit={guardarEmpresa}
      className="bg-white shadow rounded p-6 mb-6"
    >

      <h2 className="text-xl font-bold mb-4">
        Datos de la Empresa
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Razón Social"
          className="border p-2 rounded"
          value={razonSocial}
          onChange={(e) =>
            setRazonSocial(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="CUIT"
          className="border p-2 rounded"
          value={cuit}
          onChange={(e) =>
            setCuit(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email Empresa"
          className="border p-2 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Teléfono"
          className="border p-2 rounded"
          value={telefono}
          onChange={(e) =>
            setTelefono(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Dirección"
          className="border p-2 rounded col-span-2"
          value={direccion}
          onChange={(e) =>
            setDireccion(e.target.value)
          }
        />

      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">
        Administrador Inicial
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 rounded"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          className="border p-2 rounded"
          value={apellido}
          onChange={(e) =>
            setApellido(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email Administrador"
          className="border p-2 rounded"
          value={usuarioEmail}
          onChange={(e) =>
            setUsuarioEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Contraseña Inicial"
          className="border p-2 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

      </div>

      <button
        type="submit"
        className="
          mt-6
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Guardar Empresa
      </button>

    </form>
  );
}