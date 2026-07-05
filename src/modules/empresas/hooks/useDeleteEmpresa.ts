import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";

export function useDeleteEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: empresasService.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: empresasKeys.all,
      });
    },
  });
}