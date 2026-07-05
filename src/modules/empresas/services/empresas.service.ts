import { api } from "@/api/api";
import type { Empresa } from "@/types/empresa";

export const empresasService = {
  getAll: async (): Promise<Empresa[]> => {
    const res = await api.get("/admin-saas/empresas");
    return res.data;
  },

remove: async (id: number): Promise<void> => {
  await api.delete(`/admin-saas/empresas/${id}`);
},
};