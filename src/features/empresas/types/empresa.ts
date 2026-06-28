export interface Empresa {
  id_empresa: string;
  razon_social: string;
  cuit: string;
  email: string | null;
  telefono?: string | null;
  direccion?: string | null;
  estado: boolean;
}