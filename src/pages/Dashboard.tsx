import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Dashboard() {

  const [data, setData] =
    useState<any>(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const response =
          await api.get(
            '/dashboard/kpis',
          );

        setData(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  if (!data)
    return <p>Cargando...</p>;

  return (

  <div>

    <h1>Dashboard</h1>

    <div>

      <h3>Clientes</h3>
      <p>{data.clientes}</p>

    </div>

    <div>

      <h3>Artículos</h3>
      <p>{data.articulos}</p>

    </div>

    <div>

      <h3>Órdenes</h3>
      <p>{data.ordenes}</p>

    </div>

    <div>

      <h3>Ventas Totales</h3>
      <p>${data.ventas_totales}</p>

    </div>

  </div>

);

}