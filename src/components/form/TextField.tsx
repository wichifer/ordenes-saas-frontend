// src/components/form/TextField.tsx

import {
  forwardRef,
} from "react";

import { Input } from "@/components/ui/input";


interface Props
  extends React.InputHTMLAttributes<HTMLInputElement> {

  label?: string;
  error?: string;
}


export const TextField = forwardRef<
  HTMLInputElement,
  Props
>(
  (
    {
      label,
      error,
      ...props
    },
    ref
  ) => {

    return (
      <div className="space-y-2">

        {label && (
          <label className="text-sm font-medium">
            {label}
          </label>
        )}


        <Input
          ref={ref}
          {...props}
        />


        {error && (
          <p className="text-xs text-destructive">
            {error}
          </p>
        )}

      </div>
    );

  }
);


TextField.displayName =
  "TextField";