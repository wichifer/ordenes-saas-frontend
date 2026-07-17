// src/modules/clientes/types/cliente.ts

export interface Cliente {

  id_cliente: number;

  nombre?: string | null;

  apellido?: string | null;

  razon_social?: string | null;

  documento?: string | null;

  cuit?: string | null;

  telefono?: string | null;

  email?: string | null;

  direccion?: string | null;

  es_consumidor_final: boolean;

  estado: boolean;

  created_at: string;

  updated_at: string;

}