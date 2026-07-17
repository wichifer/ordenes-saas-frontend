// src/modules/clientes/components/ClientesTable.tsx

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import DataTable from "@/components/common/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";

import type {
  Cliente,
} from "../types/cliente";


interface Props {

  data: Cliente[];

  onView(cliente: Cliente): void;

  onEdit(cliente: Cliente): void;

  onDelete(cliente: Cliente): void;

}


export default function ClientesTable({

  data,

  onView,

  onEdit,

  onDelete,

}: Props) {

  const columns = [

    {
      key: "cliente",

      header: "Cliente",

      render: (row: Cliente) =>

        row.razon_social ||

        [row.nombre, row.apellido]
          .filter(Boolean)
          .join(" ") ||

        "-",

    },


    {
      key: "documento",

      header: "Documento",

      render: (row: Cliente) =>

        row.cuit ||

        row.documento ||

        "-",

    },


    {
      key: "telefono",

      header: "Teléfono",

      render: (row: Cliente) =>

        row.telefono || "-",

    },


    {
      key: "email",

      header: "Email",

      render: (row: Cliente) =>

        row.email || "-",

    },


    {
      key: "consumidor",

      header: "Consumidor Final",

      render: (row: Cliente) =>

        row.es_consumidor_final
          ? "Sí"
          : "No",

    },


    {
      key: "estado",

      header: "Estado",

      render: (row: Cliente) => (

        <StatusBadge
          status={
            row.estado
              ? "active"
              : "inactive"
          }
        />

      ),

    },


    {
      key: "acciones",

      header: "",

      render: (row: Cliente) => (

        <div className="flex items-center justify-end gap-2">

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(row)}
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(row)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(row)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>

        </div>

      ),

    },

  ];


  return (

    <DataTable

      data={data}

      columns={columns}

      getRowId={(row) => row.id_cliente}

    />

  );

}