import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";

export function useEmpresas() {
  const queryClient = useQueryClient();

  // GET
  const empresasQuery = useQuery({
    queryKey: empresasKeys.all,
    queryFn: empresasService.getAll,
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: empresasService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: empresasKeys.all,
      });
    },
  });

  return {
    empresas: empresasQuery.data ?? [],
    isLoading: empresasQuery.isLoading,
    error: empresasQuery.error,

    remove: deleteMutation.mutateAsync,
  };
}