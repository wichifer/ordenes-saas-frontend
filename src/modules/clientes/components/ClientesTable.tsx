// src/modules/clientes/components/ClientesTable.tsx

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import DataTable from "@/components/common/DataTable";
import  {StatusBadge} from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";

import type {
  Cliente,
} from "../types/cliente";

import ClienteTypeBadge from "./ClienteTypeBadge";

import {
  getClienteDisplayName,
  getClienteContacto,
} from "../utils/cliente.utils";

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

        render: (row: Cliente) => (
            getClienteDisplayName(row)
        ),
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
  key: "contacto",

  header: "Contacto",

  render: (row: Cliente) => (
    getClienteContacto(row)
  ),
},


    {
  key: "tipo",

  header: "Tipo",

  render: (row: Cliente) => (

    <ClienteTypeBadge
      esConsumidorFinal={
        row.es_consumidor_final
      }
    />

  ),
},

    {
      key: "estado",

      header: "Estado",

      render: (row: Cliente) => (

        <StatusBadge
          variant={
            row.estado
              ? "default"
              : "destructive"
          }
        >
          {
            row.estado
              ? "Activo"
              : "Inactivo"
          }
        </StatusBadge>

      ),

    },


    {
      key: "acciones",

      header: "",

      render: (row: Cliente) => (

      <div className="flex items-center justify-end gap-1 whitespace-nowrap">

<Button
  variant="ghost"
  size="icon"
  onMouseDown={(e) => {
    e.currentTarget.blur();
  }}
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