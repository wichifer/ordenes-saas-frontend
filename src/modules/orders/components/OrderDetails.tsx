import type { Order } from "../types/order";

import { OrderStatusBadge } from "./OrderStatusBadge";

interface Props {
  order?: Order;
}

export function OrderDetails({ order }: Props) {

  if (!order) {
    return (
      <div className="p-4 text-muted-foreground">
        No se encontró la orden.
      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* Encabezado */}
      <div className="rounded-lg border p-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              Orden de Compra
            </p>

            <h2 className="text-2xl font-bold">
              {order.numero_orden}
            </h2>

          </div>

          <OrderStatusBadge status={order.estado} />

        </div>

      </div>

      {/* Información general */}
      <div className="rounded-lg border p-4">

        <h3 className="mb-4 font-semibold">
          Información general
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-sm text-muted-foreground">
              Fecha
            </p>
            <p className="font-medium">
              {new Date(order.fecha).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Cliente
            </p>
            <p className="font-medium">
              {order.cliente?.razon_social ??
                order.cliente?.nombre ??
                "-"}
            </p>
          </div>

        </div>

      </div>

      {/* Productos */}
      <div className="rounded-lg border">

        <div className="border-b p-4">
          <h3 className="font-semibold">
            Productos
          </h3>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b bg-muted/50">

              <tr>

                <th className="p-3 text-left text-sm font-medium">
                  Producto
                </th>

                <th className="p-3 text-center text-sm font-medium">
                  Cant.
                </th>

                <th className="p-3 text-right text-sm font-medium">
                  Precio
                </th>

                <th className="p-3 text-right text-sm font-medium">
                  Subtotal
                </th>

              </tr>

            </thead>

            <tbody>

              {order.items?.map((item) => (

                <tr
                  key={item.id_detalle_orden}
                  className="border-b"
                >

                  <td className="p-3">
                    <p className="font-medium">
                      {item.descripcion_articulo}
                    </p>
                  </td>

                  <td className="p-3 text-center">
                    {item.cantidad}
                  </td>

                  <td className="p-3 text-right">
                    ${item.precio_unitario.toFixed(2)}
                  </td>

                  <td className="p-3 text-right font-medium">
                    ${item.subtotal.toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Observaciones */}
      {order.observaciones && (

        <div className="rounded-lg border p-4">

          <h3 className="mb-2 font-semibold">
            Observaciones
          </h3>

          <p className="text-sm">
            {order.observaciones}
          </p>

        </div>

      )}

      {/* Total */}
      <div className="rounded-lg border p-4 bg-muted/30">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm text-muted-foreground">
              Total de la orden
            </p>

            <p className="text-3xl font-bold">
              ${order.total.toFixed(2)}
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}