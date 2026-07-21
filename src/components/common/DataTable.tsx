// C:\dev\ordenes-saas-frontend\src\components\common\DataTable.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Column<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  getRowId?: (row: T, index: number) => string | number;
}

export default function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyState,
  getRowId,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="p-4 text-muted-foreground">
        Cargando...
      </div>
    );
  }

  if (data.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={col.className}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={
                getRowId
                  ? getRowId(row, index)
                  : index
              }
            >
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  className={col.className}
                >
                  {col.render
                    ? col.render(row)
                    : String(
                        row[col.key as keyof T] ?? ""
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}