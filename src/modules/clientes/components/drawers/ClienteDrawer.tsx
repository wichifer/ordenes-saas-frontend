// src/modules/clientes/components/drawers/ClienteDrawer.tsx

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { ClienteForm } from "../ClienteForm";

import { useClienteDrawer } from "../../state/useClienteDrawer";


export function ClienteDrawer() {

  const {
    open,
    close,
    mode,
    selected,
  } = useClienteDrawer();


  const title =
    {
      create: "Nuevo Cliente",
      edit: "Editar Cliente",
      view: "Ver Cliente",
      delete: "Eliminar Cliente",
    }[mode] ?? "Cliente";


  return (

    <Drawer

      open={open}

      onOpenChange={(value) => {

        if (!value)
          close();

      }}

    >

        <DrawerContent
            className="
                max-w-3xl
                w-full
                max-h-[90vh]
                overflow-y-auto
            "
        >

        <DrawerHeader>

          <DrawerTitle>
            {title}
          </DrawerTitle>

        </DrawerHeader>


        <ClienteForm

          mode={mode}

          cliente={selected}

          onClose={close}

        />

      </DrawerContent>

    </Drawer>

  );

}