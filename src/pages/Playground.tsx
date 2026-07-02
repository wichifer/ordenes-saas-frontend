import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import LoadingState from "@/components/common/LoadingState";

import { TableCell, TableRow } from "@/components/ui/table";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { toast } from "sonner";

export default function Playground() {
  const [search, setSearch] = useState("");

  return (
    <>
      <PageHeader
        title="UI Playground"
        description="Pruebas de componentes comunes del SaaS"
      />

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-lg font-semibold">StatusBadge</h2>

          <div className="flex flex-wrap gap-2">
            <StatusBadge status="active" />
            <StatusBadge status="inactive" />
            <StatusBadge status="pending" />
            <StatusBadge status="error" />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">SearchInput</h2>

          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar empresa..."
          />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">DataTable</h2>

          <DataTable columns={["Empresa", "Estado"]}>
            <TableRow>
              <TableCell>OpenAI SRL</TableCell>
              <TableCell>
                <StatusBadge status="active" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Empresa Demo</TableCell>
              <TableCell>
                <StatusBadge status="pending" />
              </TableCell>
            </TableRow>
          </DataTable>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold">
           LoadingState
          </h2>
          <LoadingState />
        </section>
        <section>
            <h2 className="mb-3 text-lg font-semibold">
                EmptyState
            </h2>
            <EmptyState
                title="No hay empresas"
                description="Todavía no registraste ninguna empresa."
            >
                <Button>
                Nueva empresa
                </Button>
            </EmptyState>
        </section>
        <section>
            <h2 className="mb-3 text-lg font-semibold">
                ConfirmDialog
            </h2>

            <ConfirmDialog
                title="Eliminar empresa"
                description="Esta acción eliminará la empresa de forma permanente."
                onConfirm={() =>
                    toast.success("Empresa eliminada correctamente")
                }
            >
                <Button variant="destructive">
                Eliminar empresa
                </Button>
            </ConfirmDialog>
        </section>
      </div>
    </>
  );
}