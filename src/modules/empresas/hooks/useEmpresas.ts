import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";

export function useEmpresas() {
  const queryClient = useQueryClient();

  // GET (server state)
  const empresasQuery = useQuery({
    queryKey: empresasKeys.all,
    queryFn: empresasService.getAll,
  });

  // DELETE (mutation)
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
    loading: empresasQuery.isLoading,
    error: empresasQuery.error,

    remove: deleteMutation.mutateAsync,
    removing: deleteMutation.isPending,
  };
}