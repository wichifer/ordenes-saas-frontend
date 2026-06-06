import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';

export default function EditProduct() {

  const { id } = useParams();

  const [codigo, setCodigo] =
    useState('');

  const [descripcion, setDescripcion] =
    useState('');

  const [precio, setPrecio] =
    useState('');

  const [stockActual, setStockActual] =
    useState('');

  const [stockMinimo, setStockMinimo] =
    useState('');

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct =
    async () => {

      try {

        const response =
          await api.get(
            `/products/${id}`,
          );

        const product =
          response.data;

        setCodigo(
          product.codigo,
        );

        setDescripcion(
          product.descripcion,
        );

        setPrecio(
          product.precio_final,
        );

        setStockActual(
          product.stock_actual,
        );

        setStockMinimo(
          product.stock_minimo,
        );

      } catch (error) {

        console.error(error);

      }

    };

  const saveProduct =
    async () => {

      try {

        await api.patch(
          `/products/${id}`,
          {
            codigo,
            descripcion,

            precio_final:
              Number(precio),

            stock_actual:
              Number(stockActual),

            stock_minimo:
              Number(stockMinimo),
          },
        );

        alert(
          'Producto actualizado',
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>
        Editar Producto
      </h1>

      <input
        value={codigo}
        onChange={(e) =>
          setCodigo(
            e.target.value,
          )
        }
      />

      <br />

      <input
        value={descripcion}
        onChange={(e) =>
          setDescripcion(
            e.target.value,
          )
        }
      />

      <br />

      <input
        value={precio}
        onChange={(e) =>
          setPrecio(
            e.target.value,
          )
        }
      />

      <br />

      <input
        value={stockActual}
        onChange={(e) =>
          setStockActual(
            e.target.value,
          )
        }
      />

      <br />

      <input
        value={stockMinimo}
        onChange={(e) =>
          setStockMinimo(
            e.target.value,
          )
        }
      />

      <br />

      <button
        onClick={saveProduct}
      >
        Guardar Cambios
      </button>

    </div>

  );

}