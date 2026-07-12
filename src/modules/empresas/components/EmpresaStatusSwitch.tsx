import { Switch } from "@/components/ui/switch";

import type { Empresa } from "@/types/empresa";

import { useUpdateEmpresaStatus } from "../hooks/useUpdateEmpresaStatus";

interface Props {
  empresa: Empresa;
}

export function EmpresaStatusSwitch({
  empresa,
}: Props) {
  const mutation = useUpdateEmpresaStatus();

  return (
    <Switch
      checked={empresa.estado}
      disabled={mutation.isPending}
      onCheckedChange={(checked) =>
        mutation.mutate({
          id: empresa.id_empresa,
          estado: checked,
        })
      }
    />
  );
}