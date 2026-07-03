import DataTable from "@/components/common/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import type { Empresa } from "@/types/empresa";

interface Props {
  data: Empresa[];
  onDelete: (empresa: Empresa) => void;
}

export default function EmpresasTable({ data, onDelete }: Props) {
  const columns = [
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
          onClick={() => onDelete(row)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Eliminar
        </button>
      ),
    },
  ];

  return <DataTable data={data} columns={columns} />;
}