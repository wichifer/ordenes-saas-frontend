import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';

export default function Products() {

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts =
    async () => {

      try {

        const response =
          await api.get(
            '/products',
          );

        setProducts(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  const deleteProduct =
    async (id: string) => {

      const confirmar =
        window.confirm(
          '¿Eliminar producto?',
        );

      if (!confirmar)
        return;

      try {

        await api.delete(
          `/products/${id}`,
        );

        loadProducts();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>Productos</h1>

      <Link to="/products/new">

        <button>

          Nuevo Producto

        </button>

      </Link>

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Código</th>

            <th>Descripción</th>

            <th>Precio</th>

            <th>Stock</th>

            <th>Stock Min.</th>

            <th>Acciones
                
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map(
            (product) => (

              <tr
                key={
                  product.id_articulo
                }
              >

                <td>
                  {
                    product.id_articulo
                  }
                </td>

                <td>
                  {
                    product.codigo
                  }
                </td>

                <td>
                  {
                    product.descripcion
                  }
                </td>

                <td>
                  $
                  {
                    product.precio_final
                  }
                </td>

                <td>
                  {
                    product.stock_actual
                  }
                </td>

                <td>
                  {
                    product.stock_minimo
                  }
                </td>

                <td>

                    <Link
                    to={`/products/edit/${product.id_articulo}`}
                    >

                    <button>

                        Editar

                    </button>

                    </Link>

                  <button
                    onClick={() =>
                      deleteProduct(
                        product.id_articulo,
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