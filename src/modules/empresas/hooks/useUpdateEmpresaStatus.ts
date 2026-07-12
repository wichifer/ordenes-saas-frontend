import { useMutation, useQueryClient } from "@tanstack/react-query";

import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";

export function useUpdateEmpresaStatus() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      estado,
    }: {
      id: number;
      estado: boolean;
    }) =>
      empresasService.updateStatus(id, estado),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: empresasKeys.all,
      });

    },

  });

}