import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function CreateOrder() {

  const [clients, setClients] =
    useState<any[]>([]);

  const [products, setProducts] =
    useState<any[]>([]);

  const [clientId, setClientId] =
    useState('');

  const [productId, setProductId] =
    useState('');

  const [quantity, setQuantity] =
    useState(1);

  const [items, setItems] =
    useState<any[]>([]);

  useEffect(() => {

    loadClients();
    loadProducts();

  }, []);

  const loadClients =
    async () => {

      const response =
        await api.get(
          '/clients',
        );

      setClients(
        response.data,
      );

    };

  const loadProducts =
    async () => {

      const response =
        await api.get(
          '/products',
        );

      setProducts(
        response.data,
      );

    };

  const addItem =
    () => {

      const product =
        products.find(
          (p) =>
            p.id_articulo ===
            productId,
        );

      if (!product)
        return;

      setItems([
        ...items,

        {
          id_articulo:
            product.id_articulo,

          descripcion_articulo:
            product.descripcion,

          cantidad:
            quantity,

          precio_unitario:
            Number(
              product.precio_final,
            ),
        },
      ]);

    };

  const total =
    items.reduce(

      (sum, item) =>

        sum +

        item.cantidad *
          item.precio_unitario,

      0,

    );

  const saveOrder =
    async () => {

      try {

        await api.post(
          '/orders',
          {
            id_cliente:
              clientId,

            observaciones:
              '',

            items,
          },
        );

        alert(
          'Orden creada',
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>
        Nueva Orden
      </h1>

      <select
        value={clientId}
        onChange={(e) =>
          setClientId(
            e.target.value,
          )
        }
      >

        <option value="">
          Cliente
        </option>

        {clients.map(
          (client) => (

            <option
              key={
                client.id_cliente
              }
              value={
                client.id_cliente
              }
            >

              {client.nombre}
              {' '}
              {client.apellido}

            </option>

          ),
        )}

      </select>

      <br />
      <br />

      <select
        value={productId}
        onChange={(e) =>
          setProductId(
            e.target.value,
          )
        }
      >

        <option value="">
          Producto
        </option>

        {products.map(
          (product) => (

            <option
              key={
                product.id_articulo
              }
              value={
                product.id_articulo
              }
            >

              {product.descripcion}

            </option>

          ),
        )}

      </select>

      <input
        type="number"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            Number(
              e.target.value,
            ),
          )
        }
      />

      <button
        onClick={addItem}
      >

        Agregar

      </button>

      <hr />

      <h2>
        Items
      </h2>

      {items.map(
        (item, index) => (

          <div key={index}>

            {item.descripcion_articulo}

            {' - '}

            {item.cantidad}

            {' x '}

            {item.precio_unitario}

          </div>

        ),
      )}

      <hr />

      <h2>

        Total: $

        {total}

      </h2>

      <button
        onClick={saveOrder}
      >

        Guardar Orden

      </button>

    </div>

  );

}