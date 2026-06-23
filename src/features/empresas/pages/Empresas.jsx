import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import EmpresaForm from '../components/EmpresaForm';

export default function Empresas() {

  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarEmpresas = async () => {
    try {
      const response = await api.get('/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Empresas
      </h1>

      <EmpresaForm onEmpresaCreada={cargarEmpresas} />

      <div className="mt-8">

        {loading ? (
          <p>Cargando...</p>
        ) : (

          <table className="w-full border">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Razón Social</th>
                <th className="p-2 border">CUIT</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Estado</th>
              </tr>

            </thead>

            <tbody>

              {empresas.map((empresa) => (

                <tr key={empresa.id_empresa}>

                  <td className="p-2 border">
                    {empresa.id_empresa}
                  </td>

                  <td className="p-2 border">
                    {empresa.razon_social}
                  </td>

                  <td className="p-2 border">
                    {empresa.cuit}
                  </td>

                  <td className="p-2 border">
                    {empresa.email}
                  </td>

                  <td className="p-2 border">
                    {empresa.estado ? 'Activa' : 'Inactiva'}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}