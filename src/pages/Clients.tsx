import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Link } from 'react-router-dom';

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
const deleteClient =
  async (id: string) => {

    const confirmar =
      confirm(
        '¿Eliminar cliente?',
      );

    if (!confirmar)
      return;

    try {

      await api.delete(
        `/clients/${id}`,
      );

      loadClients();

    } catch (error) {

      console.error(error);

    }

  };
  return (

    <div>

      <h1>Clientes</h1>
      <Link to="/clients/new">

        <button>

          Nuevo Cliente

        </button>

      </Link>
      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Nombre</th>

            <th>Email</th>

            <th>Acciones</th>

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
                <td>
                  <Link
                    to={`/clients/edit/${client.id_cliente}`}
                  >
                    <button>
                      Editar
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      deleteClient(
                        client.id_cliente,
                      )
                    }
                  >
                    Eliminar
                  </button>
                </td>                

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}