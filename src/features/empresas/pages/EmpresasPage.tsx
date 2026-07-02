import { useEffect, useState, useMemo } from "react";
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
import DataTable from "@/components/common/DataTable";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empresaAEliminar, setEmpresaAEliminar] = useState<Empresa | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarEmpresas();
  }, []);

  async function cargarEmpresas() {
    setLoading(true);

    try {
      const response = await api.get("/admin-saas/empresas");
      setEmpresas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function eliminarEmpresa(id: string) {
    try {
      await api.delete(`/empresas/${id}`);
      cargarEmpresas();
    } catch (error) {
      console.error(error);
    }
  }

  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.razon_social.toLowerCase().includes(search.toLowerCase()) ||
    empresa.cuit.toLowerCase().includes(search.toLowerCase()) ||
    (empresa.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const columns = useMemo(
    () => [
      {
        key: "razon_social",
        header: "Razón Social",
      },
      {
        key: "cuit",
        header: "CUIT",
        render: (row: Empresa) => row.cuit ?? "-",
      },
      {
        key: "email",
        header: "Email",
      },
      {
        key: "estado",
        header: "Estado",
        render: (row: Empresa) => (
          <StatusBadge status={row.estado ? "active" : "inactive"} />
        ),
      },
      {
        key: "actions",
        header: "Acciones",
        render: (row: Empresa) => (
          <button
            onClick={() => setEmpresaAEliminar(row)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Eliminar
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <PageHeader
        title="Empresas"
        actions={
          <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
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

        <DataTable
          data={empresasFiltradas}
          columns={columns}
          loading={loading}
          emptyState={
            <EmptyState
              title="No hay empresas"
              description="No se encontraron empresas con los filtros aplicados."
            />
          }
        />

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
  );
}