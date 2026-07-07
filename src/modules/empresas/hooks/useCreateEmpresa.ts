import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empresasService } from "../services/empresas.service";

export function useCreateEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => empresasService.create(data),

    onSuccess: () => {
      // 🔥 invalida lista
      queryClient.invalidateQueries({
        queryKey: ["empresas"],
      });
    },
  });
}