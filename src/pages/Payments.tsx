
import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Payments() {

  const [payments, setPayments] =
    useState<any[]>([]);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [idOrden, setIdOrden] =
    useState('');

  const [monto, setMonto] =
    useState('');

  const [metodoPago, setMetodoPago] =
    useState('EFECTIVO');

  const [observaciones, setObservaciones] =
    useState('');

  const ordenSeleccionada =
    orders.find(
      (o) =>
        o.id_orden_compra === idOrden,
    );
const ordenesAprobadas =
  orders.filter(
    (o) =>
      o.estado ===
      'APROBADA',
  );
  useEffect(() => {

    loadPayments();
    loadOrders();

  }, []);

  const loadPayments =
    async () => {

      try {

        const response =
          await api.get(
            '/payments',
          );

        setPayments(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

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

  const createPayment =
    async () => {

      try {

        if (!idOrden) {

          alert(
            'Seleccione una orden',
          );

          return;

        }

        if (
          Number(monto) <= 0
        ) {

          alert(
            'Monto inválido',
          );

          return;

        }

        await api.post(
          '/payments',
          {

            id_orden_compra:
              idOrden,

            monto,

            metodo_pago:
              metodoPago,

            observaciones,

          },
        );

        alert(
          'Pago registrado',
        );

        setIdOrden('');
        setMonto('');
        setMetodoPago(
          'EFECTIVO',
        );
        setObservaciones('');

        loadPayments();

      } catch (error: any) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          'Error',
        );

      }

    };

  return (

    <div>

      <h1>
        Pagos
      </h1>

      <hr />

      <h2>
        Nuevo Pago
      </h2>

      <select
        value={idOrden}
        onChange={(e) =>
          setIdOrden(
            e.target.value,
          )
        }
      >

        <option value="">
          Seleccionar Orden Aprobada
        </option>

          {ordenesAprobadas.map(
            (order) => (

            <option
              key={
                order.id_orden_compra
              }
              value={
                order.id_orden_compra
              }
            >

              {
                order.numero_orden
              }

            </option>

          ),
        )}

      </select>
<div
  style={{
    marginTop: '10px',
    marginBottom: '10px',
  }}
>

  <strong>Orden:</strong>{' '}
  {ordenSeleccionada?.numero_orden}

  {' | '}

  <strong>Estado:</strong>{' '}
  {ordenSeleccionada?.estado}

  {' | '}

  <strong>Cliente:</strong>{' '}
  {ordenSeleccionada?.clientes?.nombre}{' '}
  {ordenSeleccionada?.clientes?.apellido}

  {' | '}

  <strong>Total:</strong>{' '}
  ${ordenSeleccionada?.total}

</div>
      <div
        style={{
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >

        <strong>
          Orden:
        </strong>

        {' '}

        {
          ordenSeleccionada
            ?.numero_orden
        }

        {' | '}

        <strong>
          Cliente:
        </strong>

        {' '}

        {
          ordenSeleccionada
            ?.clientes?.nombre
        }

        {' '}

        {
          ordenSeleccionada
            ?.clientes?.apellido
        }

        {' | '}

        <strong>
          Total:
        </strong>

        {' '}

        $

        {
          ordenSeleccionada
            ?.total
        }

      </div>

      <input
        placeholder="Monto"
        value={monto}
        onChange={(e) =>
          setMonto(
            e.target.value,
          )
        }
      />

      {' '}

      <select
        value={metodoPago}
        onChange={(e) =>
          setMetodoPago(
            e.target.value,
          )
        }
      >

        <option value="EFECTIVO">
          EFECTIVO
        </option>

        <option value="TRANSFERENCIA">
          TRANSFERENCIA
        </option>

        <option value="TARJETA">
          TARJETA
        </option>

      </select>

      {' '}

      <input
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) =>
          setObservaciones(
            e.target.value,
          )
        }
      />

      {' '}

      <button
        onClick={createPayment}
      >
        Guardar
      </button>

      <hr />

      <table border={1}>

        <thead>

          <tr>

            <th>ID</th>

            <th>Orden</th>

            <th>Cliente</th>

            <th>Método</th>

            <th>Monto</th>

          </tr>

        </thead>

        <tbody>

          {payments.map(
            (payment) => (

              <tr
                key={
                  payment.id_pago
                }
              >

                <td>
                  {
                    payment.id_pago
                  }
                </td>

                <td>
                  {
                    payment.ordenes_compra
                      ?.numero_orden
                  }
                </td>

                <td>

                  {
                    payment.clientes
                      ?.nombre
                  }

                  {' '}

                  {
                    payment.clientes
                      ?.apellido
                  }

                </td>

                <td>
                  {
                    payment.metodo_pago
                  }
                </td>

                <td>

                  $

                  {
                    payment.monto
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

