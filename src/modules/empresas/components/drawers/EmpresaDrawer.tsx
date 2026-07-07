import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

import { EmpresaForm } from "../EmpresaForm";
import { empresaSchema, type EmpresaFormValues } from "../../schemas/empresa.schema";

import { useEmpresaDrawer } from "../../state/useEmpresaDrawer";
import { useCreateEmpresa } from "../../hooks/useCreateEmpresa";
import { useUpdateEmpresa } from "../../hooks/useUpdateEmpresa";

export function EmpresaDrawer() {
  const { open, mode, selected, close } = useEmpresaDrawer();

  const isReadOnly = mode === "view";
  const isEdit = mode === "edit";

  const createMutation = useCreateEmpresa();
  const updateMutation = useUpdateEmpresa();

  const defaultValues: EmpresaFormValues = useMemo(() => {
    return {
      razon_social: selected?.razon_social ?? "",
      cuit: selected?.cuit ?? "",
      email: selected?.email ?? "",
      telefono: selected?.telefono ?? "",
      direccion: selected?.direccion ?? "",
      nombre: "",
      apellido: "",
      usuario_email: "",
      password: "",
    };
  }, [selected]);

  const form = useForm<EmpresaFormValues>({
    resolver: zodResolver(empresaSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const handleSubmit = async (values: EmpresaFormValues) => {
    if (isReadOnly) return;

    if (isEdit && selected?.id_empresa) {
      await updateMutation.mutateAsync({
        id: selected.id_empresa,
        data: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }

    close();
    form.reset();
  };

  return (
    <Drawer open={open} onOpenChange={(v) => !v && close()}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle>
            {mode === "create" && "Nueva Empresa"}
            {mode === "edit" && "Editar Empresa"}
            {mode === "view" && "Detalle de Empresa"}
          </DrawerTitle>
        </DrawerHeader>

        <EmpresaForm
          form={form}
          onSubmit={handleSubmit}
          loading={createMutation.isPending || updateMutation.isPending}
          readonly={isReadOnly}
        />
      </DrawerContent>
    </Drawer>
  );
}