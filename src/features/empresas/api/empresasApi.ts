import { api } from '../../../api/api';

export const obtenerEmpresas = async () => {
  const response = await api.get('/empresas');
  return response.data;
};

export const crearEmpresa = async (empresa: any) => {
  const response = await api.post(
    '/empresas',
    empresa
  );

  return response.data;
};