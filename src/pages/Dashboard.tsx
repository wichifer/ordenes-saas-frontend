import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Dashboard() {

  const [executive, setExecutive] =
    useState<any>(null);

  const [alerts, setAlerts] =
    useState<any>(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const [
          executiveResponse,
          alertsResponse,
        ] = await Promise.all([

          api.get(
            '/dashboard/executive',
          ),

          api.get(
            '/dashboard/alerts',
          ),

        ]);

        setExecutive(
          executiveResponse.data,
        );

        setAlerts(
          alertsResponse.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>
        Dashboard Ejecutivo
      </h1>

      {executive && (

        <div>

          <h2>
            Resumen
          </h2>

          <table border={1}>

            <tbody>

              <tr>

                <td>
                  Productos con stock bajo
                </td>

                <td>

                  {
                    executive.stock_bajo
                  }

                </td>

              </tr>

              <tr>

                <td>
                  Clientes deudores
                </td>

                <td>

                  {
                    executive.clientes_deudores
                  }

                </td>

              </tr>

              <tr>

                <td>
                  Saldo pendiente
                </td>

                <td>

                  $

                  {
                    executive.saldo_total_clientes
                  }

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      )}

      <br />

      {alerts && (

        <div>

          <h2>
            Alertas
          </h2>

          <table border={1}>

            <tbody>

              <tr>

                <td>
                  Stock bajo
                </td>

                <td>

                  {
                    alerts.stock_bajo
                  }

                </td>

              </tr>

              <tr>

                <td>
                  Clientes deudores
                </td>

                <td>

                  {
                    alerts.clientes_deudores
                  }

                </td>

              </tr>

              <tr>

                <td>
                  Saldo pendiente
                </td>

                <td>

                  $

                  {
                    alerts.saldo_total_clientes
                  }

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}