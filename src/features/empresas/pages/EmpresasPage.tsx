import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import type { Empresa } from "../../../types/empresa";
import EmpresaForm from "../components/EmpresaForm";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarEmpresas();
  }, []);

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
          <input
            type="text"
            placeholder="Buscar empresa..."
            className="
              w-full
              rounded-lg
              border
              bg-background
              px-3
              py-2
              text-foreground
              placeholder:text-muted-foreground
              outline-none
              focus:ring-2
              focus:ring-primary
            "
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
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-muted-foreground"
                  >
                    Cargando...
                  </td>
                </tr>
              ) : empresas.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-muted-foreground"
                  >
                    Sin datos
                  </td>
                </tr>
              ) : (
                empresas.map((empresa) => (
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
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          empresa.estado
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {empresa.estado
                          ? "Activa"
                          : "Inactiva"}
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