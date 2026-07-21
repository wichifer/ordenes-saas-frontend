import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  children: React.ReactNode;

  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline";
}

export function StatusBadge({
  children,
  variant = "secondary",
}: StatusBadgeProps) {
  return (
    <Badge variant={variant}>
      {children}
    </Badge>
  );
}