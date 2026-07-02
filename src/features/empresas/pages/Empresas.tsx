/* src/features/empresas/pages/Empresas.tsx */
import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import EmpresaForm from "../components/EmpresaForm";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import LoadingState from "@/components/common/LoadingState";
import EmptyState from "@/components/common/EmptyState";

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
const isEmpty = !loading && empresasFiltradas.length === 0;
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
  <LoadingState message="Cargando empresas..." />
) : isEmpty ? (
  <EmptyState
    title="No hay empresas"
    description="No se encontraron empresas con los filtros aplicados."
  />
) : (
  <table className="w-full text-sm">

      </div>
    </div>
  );
}