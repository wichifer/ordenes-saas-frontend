// src/components/form/Form.tsx

import type {
  FormHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";


interface Props
  extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}


export function Form({
  children,
  className,
  ...props
}: Props) {

  return (
    <form
      className={cn(
        "space-y-6",
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
}