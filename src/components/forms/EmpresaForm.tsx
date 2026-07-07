/// src/modules/empresas/components/EmpresaForm.tsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { empresaSchema, type EmpresaFormValues } from "../schemas/empresa.schema";

import { useCreateEmpresa } from "../hooks/useCreateEmpresa";
import { useUpdateEmpresa } from "../hooks/useUpdateEmpresa";
import { useEmpresaById } from "../hooks/useEmpresaById";

interface Props {
  id?: number;
  readonly?: boolean;
}

export function EmpresaForm({ id, readonly }: Props) {
  const isEdit = !!id;

  const createEmpresa = useCreateEmpresa();
  const updateEmpresa = useUpdateEmpresa();

  const { data: empresa } = useEmpresaById(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmpresaFormValues>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      razon_social: "",
      cuit: "",
      email: "",
    },
  });

  // 🔥 hidratar en EDIT
  useEffect(() => {
    if (empresa && isEdit) {
      reset({
        razon_social: empresa.razon_social,
        cuit: empresa.cuit,
        email: empresa.email,
      });
    }
  }, [empresa, isEdit, reset]);

  const onSubmit = async (values: EmpresaFormValues) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <Input
          placeholder="Razón Social"
          disabled={readonly}
          {...register("razon_social")}
        />
        {errors.razon_social && (
          <p className="text-sm text-red-500">
            {errors.razon_social.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="CUIT"
          disabled={readonly}
          {...register("cuit")}
        />
      </div>

      <div>
        <Input
          placeholder="Email"
          disabled={readonly}
          {...register("email")}
        />
      </div>

      {!readonly && (
        <Button
          type="submit"
          disabled={
            createEmpresa.isPending ||
            updateEmpresa.isPending
          }
        >
          {isEdit ? "Actualizar" : "Crear"}
        </Button>
      )}
    </form>
  );
}