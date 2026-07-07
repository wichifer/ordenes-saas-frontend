// src/components/forms/EmpresaCreateForm.tsx
import { EmpresaForm } from "./EmpresaForm";
import { useCreateEmpresa } from "../hooks/useCreateEmpresa";

export function EmpresaCreateForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const createEmpresa = useCreateEmpresa();

  return (
    <EmpresaForm
      loading={createEmpresa.isPending}
      onSubmit={(data) =>
        createEmpresa.mutate(data, {
          onSuccess: () => onSuccess?.(),
        })
      }
    />
  );
}