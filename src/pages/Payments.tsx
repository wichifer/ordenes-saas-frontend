
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useSearchParams,} from 'react-router-dom';


export default function Payments() {
const [searchParams] =
  useSearchParams();
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
    useEffect(() => {

  if (ordenSeleccionada) {

    setMonto(
      String(
        ordenSeleccionada.saldo_pendiente,
      ),
    );

  }

}, [ordenSeleccionada]);
// const ordenesAprobadas =
//   orders.filter(
//     (o) =>
//       o.estado ===
//       'APROBADA',
//   );
 useEffect(() => {

  loadPayments();
  loadOrders();

}, []); 
useEffect(() => {
  const orderId = searchParams.get('order');

  if (
    orderId &&
    orders.length > 0 &&
    idOrden === ''
  ) {
    setIdOrden(orderId);
  }
}, [orders, searchParams, idOrden]);

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
           '/payments/pending-orders',
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
        loadOrders();
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

          {orders.map(
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
{<div
  style={{
    marginTop: '10px',
    marginBottom: '10px',
  }}
>
{ordenSeleccionada && (

  <div
    style={{
      marginTop: '10px',
      marginBottom: '10px',
      padding: '10px',
      border: '1px solid #ccc',
    }}
  >

    <div>
      <strong>Orden:</strong>{' '}
      {ordenSeleccionada.numero_orden}
    </div>

    <div>
      <strong>Cliente:</strong>{' '}
      {ordenSeleccionada.cliente}
    </div>

    <div>
      <strong>Total:</strong>{' '}
      ${ordenSeleccionada.total}
    </div>

    <div>
      <strong>Pagado:</strong>{' '}
      ${ordenSeleccionada.total_pagado}
    </div>

    <div>
      <strong>Pendiente:</strong>{' '}
      ${ordenSeleccionada.saldo_pendiente}
    </div>

  </div>

)}
</div> }
{/*       <div
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

      </div> */}

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

