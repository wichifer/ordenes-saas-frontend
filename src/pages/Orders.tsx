import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Orders() {

  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders =
    async () => {

      try {

        const response =
          await api.get(
            '/orders',
          );

        setOrders(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>
        Órdenes
      </h1>

      <table border={1}>

        <thead>

          <tr>

            <th>Número</th>

            <th>Cliente</th>

            <th>Estado</th>

            <th>Total</th>

            <th>Fecha</th>

          </tr>

        </thead>

        <tbody>

          {orders.map(
            (order) => (

              <tr
                key={
                  order.id_orden_compra
                }
              >

                <td>
                  {
                    order.numero_orden
                  }
                </td>

                <td>

                  {
                    order.clientes
                      ?.nombre
                  }

                  {' '}

                  {
                    order.clientes
                      ?.apellido
                  }

                </td>

                <td>
                  {
                    order.estado
                  }
                </td>

                <td>
                  $
                  {
                    order.total
                  }
                </td>

                <td>

                  {new Date(
                    order.fecha,
                  ).toLocaleDateString()}

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}