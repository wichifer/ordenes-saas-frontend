import { useState } from 'react';
import { api } from '../api/api';

export default function CreateProduct() {

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

  const saveProduct =
    async () => {
      
      try {
        if (
  !codigo.trim() ||
  !descripcion.trim()
) {

  alert(
    'Complete todos los campos',
  );

  return;

}

if (
  Number(precio) <= 0
) {

  alert(
    'Precio inválido',
  );

  return;

}

        await api.post(
          '/products',
          {
            codigo,
            descripcion,

            precio_final:
              Number(precio),

            stock_actual:
              Number(stockActual),

            stock_minimo:
              Number(stockMinimo),

            //estado: true,
          },
        );

        alert(
          'Producto creado',
        );

      } catch (error: any) {

  console.error(error);

  console.log(
    error.response?.data,
  );

  alert(
    JSON.stringify(
      error.response?.data,
      null,
      2,
    ),
  );

}

    };

  return (

    <div>

      <h1>
        Nuevo Producto
      </h1>

      <input
        placeholder="Código"
        value={codigo}
        onChange={(e) =>
          setCodigo(
            e.target.value,
          )
        }
      />

      <br />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) =>
          setDescripcion(
            e.target.value,
          )
        }
      />

      <br />

      <input
        placeholder="Precio"
        value={precio}
        onChange={(e) =>
          setPrecio(
            e.target.value,
          )
        }
      />

      <br />

      <input
        placeholder="Stock Actual"
        value={stockActual}
        onChange={(e) =>
          setStockActual(
            e.target.value,
          )
        }
      />

      <br />

      <input
        placeholder="Stock Mínimo"
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
        Guardar
      </button>

    </div>

  );

}