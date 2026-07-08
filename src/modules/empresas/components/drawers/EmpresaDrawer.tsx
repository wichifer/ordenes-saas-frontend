// src/modules/empresas/components/drawers/EmpresaDrawer.tsx

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { EmpresaForm } from "../EmpresaForm";

import {
  createEmpresaSchema,
  updateEmpresaSchema,
  type CreateEmpresaFormValues,
  type UpdateEmpresaFormValues,
} from "../../schemas";

import { useEmpresaDrawer } from "../../state/useEmpresaDrawer";

import { useCreateEmpresa } from "../../hooks/useCreateEmpresa";
import { useUpdateEmpresa } from "../../hooks/useUpdateEmpresa";

type EmpresaFormValues =
  | CreateEmpresaFormValues
  | UpdateEmpresaFormValues;

export function EmpresaDrawer() {
  const {
    open,
    mode,
    selected,
    close,
  } = useEmpresaDrawer();

  const isEdit = mode === "edit";
  const isReadOnly = mode === "view";

  const createMutation = useCreateEmpresa();
  const updateMutation = useUpdateEmpresa();

  const schema = isEdit
    ? updateEmpresaSchema
    : createEmpresaSchema;

  const defaultValues = useMemo(() => {
    if (isEdit) {
      return {
        razon_social: selected?.razon_social ?? "",
        cuit: selected?.cuit ?? "",
        email: selected?.email ?? "",
        telefono: selected?.telefono ?? "",
        direccion: selected?.direccion ?? "",
      };
    }

    return {
      razon_social: "",
      cuit: "",
      email: "",
      telefono: "",
      direccion: "",

      nombre: "",
      apellido: "",
      usuario_email: "",
      password: "",
    };
  }, [selected, isEdit]);

  const form = useForm<EmpresaFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  async function handleSubmit(
    values: EmpresaFormValues
  ) {
    if (isReadOnly) return;

    try {
      if (isEdit && selected) {
        await updateMutation.mutateAsync({
          id: selected.id_empresa,
          data: values as UpdateEmpresaFormValues,
        });
      } else {
        await createMutation.mutateAsync(
          values as CreateEmpresaFormValues
        );
      }

      close();
      form.reset();

    } catch {
      // Los hooks ya muestran el toast correspondiente
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        if (!value) close();
      }}
    >
      <DrawerContent className="p-6">

        <DrawerHeader>

          <DrawerTitle>

            {mode === "create" &&
              "Nueva Empresa"}

            {mode === "edit" &&
              "Editar Empresa"}

            {mode === "view" &&
              "Detalle de Empresa"}

          </DrawerTitle>

        </DrawerHeader>

        <EmpresaForm
          form={form}
          onSubmit={handleSubmit}
          readonly={isReadOnly}
          showAdminFields={!isEdit}
          loading={
            createMutation.isPending ||
            updateMutation.isPending
          }
          submitLabel={
            isEdit
              ? "Actualizar"
              : "Crear empresa"
          }
          loadingLabel={
            isEdit
              ? "Actualizando..."
              : "Creando..."
          }
        />

      </DrawerContent>
    </Drawer>
  );
}