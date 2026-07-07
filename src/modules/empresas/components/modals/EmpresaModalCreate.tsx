import { EmpresaForm } from "../EmpresaForm";
import { useCreateEmpresa } from "../../hooks/useCreateEmpresa";

export function EmpresaModalCreate({ open, onClose }) {
  const createEmpresa = useCreateEmpresa();

  return (
    open && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 w-[500px]">
          <EmpresaForm
            onSubmit={(data) =>
              createEmpresa.mutate(data, {
                onSuccess: () => {
                  onClose();
                },
              })
            }
            loading={createEmpresa.isPending}
          />
        </div>
      </div>
    )
  );
}