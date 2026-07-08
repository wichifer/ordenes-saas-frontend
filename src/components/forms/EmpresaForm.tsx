// src/modules/empresas/components/EmpresaForm.tsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormSection,
  FormRow,
  TextField,
} from "@/components/form";

import { Button } from "@/components/ui/button";

import {
  empresaSchema,
  type EmpresaFormValues,
} from "../schemas/empresa.schema";

import { useCreateEmpresa } from "../hooks/useCreateEmpresa";
import { useUpdateEmpresa } from "../hooks/useUpdateEmpresa";
import { useEmpresaById } from "../hooks/useEmpresaById";


interface Props {
  id?: number;
  readonly?: boolean;
}


export function EmpresaForm({
  id,
  readonly,
}: Props) {

  const isEdit = !!id;


  const createEmpresa = useCreateEmpresa();

  const updateEmpresa = useUpdateEmpresa();


  const { data: empresa } = useEmpresaById(id);


  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<EmpresaFormValues>({
    resolver: zodResolver(empresaSchema),

    defaultValues: {
      razon_social: "",
      cuit: "",
      email: "",
    },
  });



  useEffect(() => {

    if (empresa && isEdit) {

      reset({
        razon_social: empresa.razon_social,
        cuit: empresa.cuit,
        email: empresa.email,
      });

    }

  }, [
    empresa,
    isEdit,
    reset,
  ]);



  const onSubmit = async (
    values: EmpresaFormValues
  ) => {

    if (readonly) return;


    if (isEdit && id) {

      await updateEmpresa.mutateAsync({
        id,
        data: values,
      });

    } else {

      await createEmpresa.mutateAsync(values);

    }

  };



  return (

    <Form
      onSubmit={handleSubmit(onSubmit)}
    >

      <FormSection
        title="Datos de la Empresa"
        description="Información principal de la empresa."
      >

        <FormRow>

          <TextField
            label="Razón Social"
            placeholder="Razón Social"
            disabled={readonly}
            error={
              errors.razon_social?.message
            }
            {...register(
              "razon_social"
            )}
          />


          <TextField
            label="CUIT"
            placeholder="CUIT"
            disabled={readonly}
            error={
              errors.cuit?.message
            }
            {...register(
              "cuit"
            )}
          />


        </FormRow>


        <FormRow columns={1}>

          <TextField
            label="Email"
            type="email"
            placeholder="Email"
            disabled={readonly}
            error={
              errors.email?.message
            }
            {...register(
              "email"
            )}
          />


        </FormRow>


      </FormSection>



      {!readonly && (

        <Button
          type="submit"
          disabled={
            createEmpresa.isPending ||
            updateEmpresa.isPending
          }
        >

          {
            isEdit
              ? "Actualizar"
              : "Crear"
          }

        </Button>

      )}


    </Form>

  );
}