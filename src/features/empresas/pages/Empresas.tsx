/* src/features/empresas/pages/Empresas.tsx */
import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import EmpresaForm from "../components/EmpresaForm";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";

interface Empresa {
  id_empresa: string;
  razon_social: string;
  cuit: string;
  email: string | null;
  estado: boolean;
}

export default function Empresas() {
  const [search, setSearch] = useState("");
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const cargarEmpresas = async () => {
    try {
      const response = await api.get("/empresas");
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
const empresasFiltradas = empresas.filter((empresa) =>
  empresa.razon_social.toLowerCase().includes(search.toLowerCase()) ||
  empresa.cuit.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="space-y-6">

      <PageHeader
        title="Empresas"
        description="Administración de empresas del sistema."
      />
      <SearchInput
        placeholder="Buscar por razón social o CUIT..."
        value={search}
        onChange={setSearch}
      />
      {/* Form */}
      <EmpresaForm onEmpresaCreada={cargarEmpresas} />

      {/* Table container */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">

        {loading ? (
          <p className="p-4 text-muted-foreground">
            Cargando...
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Razón Social</th>
                <th className="p-3 text-left">CUIT</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Estado</th>
              </tr>
            </thead>

            <tbody>
              {empresasFiltradas.map((empresa) => (
                <tr
                  key={empresa.id_empresa}
                  className="border-t border-border hover:bg-muted/50"
                >
                  <td className="p-3">{empresa.id_empresa}</td>
                  <td className="p-3">{empresa.razon_social}</td>
                  <td className="p-3">{empresa.cuit}</td>
                  <td className="p-3">{empresa.email}</td>
                  <td className="p-3">
                    {empresa.estado ? "Activa" : "Inactiva"}
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