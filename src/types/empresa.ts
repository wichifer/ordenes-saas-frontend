export interface Empresa {
  id_empresa: string;
  razon_social: string;
  nombre_comercial: string | null;
  cuit: string | null;
  email: string;
  telefono: string | null;
  estado: boolean;
  created_at: string;
  usuario_admin: string | null;
}