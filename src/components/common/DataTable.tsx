import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type Column<T> = {
  key: string;
  header: string;
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
  loading,
  emptyState,
  getRowId,
}: DataTableProps<T>) {
  if (loading) {
    return <div className="p-4 text-muted-foreground">Cargando...</div>;
  }

  if (!data.length) {
    return <>{emptyState}</>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={getRowId ? getRowId(row, index) : index}
          >
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.render
                  ? col.render(row)
                  : (row as any)[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}