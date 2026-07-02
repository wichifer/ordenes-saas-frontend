import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
      <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}