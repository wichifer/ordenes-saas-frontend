import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Clients() {

  const [clients, setClients] =
    useState<any[]>([]);

  useEffect(() => {

    loadClients();

  }, []);

  const loadClients =
    async () => {

      try {

        const response =
          await api.get(
            '/clients',
          );

        setClients(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>Clientes</h1>
      <button>
         Nuevo Cliente
      </button>
      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Nombre</th>

            <th>Email</th>

          </tr>

        </thead>

        <tbody>

          {clients.map(
            (client) => (

              <tr
                key={
                  client.id_cliente
                }
              >

                <td>
                  {
                    client.id_cliente
                  }
                </td>

                <td>

                    {
                        client.razon_social ||

                        `${client.nombre ?? ''} ${client.apellido ?? ''}`
                        .trim()
                    }

                </td>

                <td>

                  {
                    client.email
                  }

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}