import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import type { Empresa } from "../../../types/empresa";
import EmpresaForm from "../components/EmpresaForm";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/common/SearchInput";
import LoadingState from "@/components/common/LoadingState";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empresaAEliminar, setEmpresaAEliminar] = useState<Empresa | null>(null);

  const [search, setSearch] = useState("");
  useEffect(() => {
    cargarEmpresas();
  }, []);
async function eliminarEmpresa(id: string) {
  try {
    await api.delete(`/empresas/${id}`);
    cargarEmpresas();
  } catch (error) {
    console.error(error);
  }
}
  async function cargarEmpresas() {
    try {
      const response = await api.get("/admin-saas/empresas");

      console.log("Empresas:", response.data);

      setEmpresas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
const empresasFiltradas = empresas.filter((empresa) =>
  empresa.razon_social.toLowerCase().includes(search.toLowerCase()) ||
  empresa.cuit.toLowerCase().includes(search.toLowerCase()) ||
  (empresa.email ?? "").toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Empresas"
        actions={
          <Button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Cerrar" : "Nueva Empresa"}
          </Button>
        }
      />

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <EmpresaForm
            onEmpresaCreada={() => {
              cargarEmpresas();
              setMostrarFormulario(false);
            }}
          />
        </div>
      )}

      {/* Card */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            placeholder="Buscar empresa..."
            value={search}
            onChange={setSearch}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b">
                <th className="p-4 text-left font-semibold text-foreground">
                  Razón Social
                </th>

                <th className="p-4 text-left font-semibold text-foreground">
                  CUIT
                </th>

                <th className="p-4 text-left font-semibold text-foreground">
                  Email
                </th>

                <th className="p-4 text-left font-semibold text-foreground">
                  Estado
                </th>
                <th className="p-4 text-left font-semibold text-foreground">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
{loading ? (
  <tr>
    <td colSpan={4} className="p-6">
      <LoadingState message="Cargando empresas..." />
    </td>
  </tr>
) : empresasFiltradas.length === 0 ? (
  <tr>
    <td colSpan={4} className="p-6">
      <EmptyState
        title="No hay empresas"
        description="No se encontraron empresas con los filtros aplicados."
      />
    </td>
  </tr>
) : (
                empresasFiltradas.map((empresa) => (
                  <tr
                    key={empresa.id_empresa}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    <td className="p-4 text-foreground">
                      {empresa.razon_social}
                    </td>

                    <td className="p-4 text-muted-foreground">
                      {empresa.cuit ?? "-"}
                    </td>

                    <td className="p-4 text-muted-foreground">
                      {empresa.email}
                    </td>

<td className="p-4">
<StatusBadge status={empresa.estado ? "active" : "inactive"} />
</td>
<td className="p-4">
  <button
    onClick={() => setEmpresaAEliminar(empresa)}
    className="text-red-600 hover:text-red-800 text-sm"
  >
    Eliminar
  </button>
</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <ConfirmDialog
  open={!!empresaAEliminar}
  title="Eliminar empresa"
  description={`¿Estás seguro de eliminar ${empresaAEliminar?.razon_social}?`}
  onCancel={() => setEmpresaAEliminar(null)}
  onConfirm={async () => {
    if (!empresaAEliminar) return;
    await eliminarEmpresa(empresaAEliminar.id_empresa);
    setEmpresaAEliminar(null);
  }}
/>
        </div>
      </div>
    </div>
  );
}