// src/modules/empresas/components/EmpresaForm.tsx


import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";

import EmpresaFormFields from "./EmpresaFormFields";

import {
  empresaSchema,
  type EmpresaFormValues,
} from "../schemas/empresa.schema";

interface Props {
  defaultValues?: Partial<EmpresaFormValues>;
  onSubmit: (values: EmpresaFormValues) => void;
  loading?: boolean;
  readonly?: boolean;
}
export function EmpresaForm({
  form,
  onSubmit,
  loading = false,
  readonly = false,
}: {
  form: UseFormReturn<EmpresaFormValues>;
  onSubmit: (values: EmpresaFormValues) => void;
  loading?: boolean;
  readonly?: boolean;
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <EmpresaFormFields form={form} readonly={readonly} />

      {!readonly && (
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      )}
    </form>
  );
}