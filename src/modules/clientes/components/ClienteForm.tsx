// src/modules/clientes/components/ClienteForm.tsx

import { useEffect } from "react";

import {
  useForm,
  FormProvider,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";


import {
  Form,
} from "@/components/form";


import {
  clienteSchema,
  type ClienteFormValues,
} from "../schemas";


import type {
  Cliente,
} from "../types/cliente";
import type { DrawerMode } from "../state/useClienteDrawer";


import {
  useCreateCliente,
} from "../hooks/useCreateCliente";


import {
  useUpdateCliente,
} from "../hooks/useUpdateCliente";


import {
  ClienteFormFields,
} from "./ClienteFormFields";


interface Props {

  mode: DrawerMode;

  cliente?: Cliente | null;

  onClose?: () => void;

}


export function ClienteForm({

  mode,

  cliente,

  onClose,

}: Props) {


  const readonly =
    mode === "view";


const isEdit =
  mode === "edit";


  const createCliente =
    useCreateCliente();


  const updateCliente =
    useUpdateCliente();



  const methods =
    useForm<ClienteFormValues>({

      resolver:
        zodResolver(clienteSchema),

      defaultValues: {

        nombre: "",

        apellido: "",

        razon_social: "",

        documento: "",

        cuit: "",

        telefono: "",

        email: "",

        direccion: "",

        es_consumidor_final: false,

      },

    });



  const {
    reset,
    handleSubmit,
  } = methods;



  useEffect(() => {

    if (cliente && isEdit) {

      reset({

        nombre:
          cliente.nombre ?? "",

        apellido:
          cliente.apellido ?? "",

        razon_social:
          cliente.razon_social ?? "",

        documento:
          cliente.documento ?? "",

        cuit:
          cliente.cuit ?? "",

        telefono:
          cliente.telefono ?? "",

        email:
          cliente.email ?? "",

        direccion:
          cliente.direccion ?? "",

        es_consumidor_final:
          cliente.es_consumidor_final,

      });

    }

  }, [
    cliente,
    isEdit,
    reset,
  ]);




  const onSubmit =
    async (
      values: ClienteFormValues,
    ) => {


      if (readonly)
        return;



      if (isEdit && cliente) {


        await updateCliente.mutateAsync({

          id:
            cliente.id_cliente,

          data:
            values,

        });



      } else {


        await createCliente.mutateAsync(
          values,
        );


      }


      onClose?.();

    };




  return (

    <FormProvider {...methods}>

      <Form
        onSubmit={
          handleSubmit(
            onSubmit,
            (errors) => {
              console.log(
                "ERRORES CLIENTE",
                errors,
              );
            },
          )
        }
      >


        <ClienteFormFields
          readonly={readonly}
        />



        {!readonly && (

          <div
            className="
              flex
              justify-end
              pt-6
            "
          >

            <button

              type="submit"

              disabled={
                createCliente.isPending ||
                updateCliente.isPending
              }

              className="
                rounded-md
                bg-primary
                px-4
                py-2
                text-primary-foreground
              "
            >

              {
                isEdit
                  ? "Actualizar Cliente"
                  : "Crear Cliente"
              }


            </button>


          </div>

        )}



      </Form>

    </FormProvider>

  );

}