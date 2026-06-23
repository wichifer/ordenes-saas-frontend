import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import type { Empresa } from '../../../types/empresa';
import EmpresaForm from '../components/EmpresaForm';

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
const [mostrarFormulario, setMostrarFormulario] =

  useState(false);
  useEffect(() => {
    cargarEmpresas();
  }, []);

  async function cargarEmpresas() {
    try {
      const response = await api.get('/admin-saas/empresas');

      console.log('Empresas:', response.data);

      setEmpresas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Empresas
        </h1>

 <button
  onClick={() =>
    setMostrarFormulario(!mostrarFormulario)
  }
  className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-4
    py-2
    rounded-lg
  "
>
  {mostrarFormulario
    ? 'Cerrar'
    : 'Nueva Empresa'}
</button>
      </div>
{mostrarFormulario && (
  <div className="mb-6">
    <EmpresaForm
      onEmpresaCreada={() => {
        cargarEmpresas();
        setMostrarFormulario(false);
      }}
    />
  </div>
)}
      <div className="bg-white rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Buscar empresa..."
          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
          "
        />

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="border-b text-left">
                <th className="p-3">Razón Social</th>
                <th className="p-3">CUIT</th>
                <th className="p-3">Email</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td className="p-3" colSpan={4}>
                    Cargando...
                  </td>
                </tr>
              ) : empresas.length === 0 ? (
                <tr>
                  <td className="p-3" colSpan={4}>
                    Sin datos
                  </td>
                </tr>
              ) : (
                empresas.map((empresa) => (
                  <tr
                    key={empresa.id_empresa}
                    className="border-b"
                  >
                    <td className="p-3">
                      {empresa.razon_social}
                    </td>

                    <td className="p-3">
                      {empresa.cuit ?? '-'}
                    </td>

                    <td className="p-3">
                      {empresa.email}
                    </td>

                    <td className="p-3">
                      <span
                        className={`
                          px-2 py-1 rounded-full text-sm
                          ${
                            empresa.estado
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }
                        `}
                      >
                        {empresa.estado
                          ? 'Activa'
                          : 'Inactiva'}
                      </span>
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}