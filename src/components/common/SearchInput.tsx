import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ComponentProps } from "react";

type SearchInputProps = ComponentProps<typeof Input>;

export default function SearchInput({
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        {...props}
        className={`pl-9 ${className ?? ""}`}
      />
    </div>
  );
}