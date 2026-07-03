/* src/modules/empresas/pages/EmpresasPage.tsx*/
import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/common/SearchInput";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import EmpresasTable from "../components/EmpresasTable";
import EmpresaForm from "../../../features/empresas/components/EmpresaForm";
import { useEmpresas } from "../hooks/useEmpresas";

import type { Empresa } from "@/types/empresa";

export default function EmpresasPage() {
  const { empresas, loading, remove } = useEmpresas();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empresaAEliminar, setEmpresaAEliminar] = useState<Empresa | null>(null);
  const [search, setSearch] = useState("");

  const filtered = empresas.filter((e) => {
    const q = search.toLowerCase();
    return (
      (e.razon_social ?? "").toLowerCase().includes(q) ||
      (e.cuit ?? "").toLowerCase().includes(q) ||
      (e.email ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">

      <PageHeader
        title="Empresas"
        actions={
          <Button onClick={() => setMostrarFormulario(v => !v)}>
            {mostrarFormulario ? "Cerrar" : "Nueva Empresa"}
          </Button>
        }
      />

      {mostrarFormulario && (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <EmpresaForm
            onEmpresaCreada={() => {
              setMostrarFormulario(false);
            }}
          />
        </div>
      )}

      <div className="rounded-xl border bg-card shadow-sm">

        <div className="p-4 border-b">
          <SearchInput
            placeholder="Buscar empresa..."
            value={search}
            onChange={setSearch}
          />
        </div>

        <EmpresasTable
          data={filtered}
          onDelete={setEmpresaAEliminar}
        />

        {!loading && filtered.length === 0 && (
          <EmptyState
            title="No hay empresas"
            description="Sin resultados."
          />
        )}
      </div>

      <ConfirmDialog
        open={!!empresaAEliminar}
        title="Eliminar empresa"
        description={`¿Eliminar ${empresaAEliminar?.razon_social}?`}
        onCancel={() => setEmpresaAEliminar(null)}
        onConfirm={async () => {
          if (!empresaAEliminar) return;

          await remove(empresaAEliminar.id_empresa);
          setEmpresaAEliminar(null);
        }}
      />
    </div>
  );
}