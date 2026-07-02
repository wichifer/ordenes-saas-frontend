import { Badge } from "@/components/ui/badge";

type Status = "active" | "inactive" | "pending" | "error";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig = {
  active: {
    label: "Activo",
    className:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  },
  inactive: {
    label: "Inactivo",
    className:
      "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300",
  },
  pending: {
    label: "Pendiente",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  error: {
    label: "Error",
    className:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300",
  },
} as const;

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}