export const empresasKeys = {
  all: ["empresas"] as const,
  detail: (id: number) => ["empresas", "detail", id] as const,
};