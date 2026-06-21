export default function EmpresasPage() {
  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Empresas
        </h1>

        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Nueva Empresa
        </button>

      </div>

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
              <tr>
                <td className="p-3">
                  Sin datos
                </td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}