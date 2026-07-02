import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  columns: string[];
  children: React.ReactNode;
}

export default function DataTable({
  columns,
  children,
}: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {children}
      </TableBody>
    </Table>
  );
}