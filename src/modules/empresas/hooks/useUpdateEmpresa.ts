import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";

export function useUpdateEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: empresasService.update,

    onSuccess: (_, variables) => {
      // refresca lista
      queryClient.invalidateQueries({
        queryKey: empresasKeys.all,
      });

      // refresca detalle
      queryClient.invalidateQueries({
        queryKey: empresasKeys.detail(variables.id),
      });
    },
  });
}