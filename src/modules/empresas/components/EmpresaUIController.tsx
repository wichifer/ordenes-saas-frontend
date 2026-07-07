// src/modules/empresas/components/EmpresaUIController.tsx

import { useEmpresaDrawer } from "../state/useEmpresaDrawer";

import EmpresaDrawer from "./drawers/EmpresaDrawer";
import { EmpresaModalCreate } from "./modals/EmpresaModalCreate";
import { EmpresaModalDelete } from "./modals/EmpresaModalDelete";

export function EmpresaUIController() {
  const { open, mode, close } = useEmpresaDrawer();

  if (!mode) return null;

  if (mode.type === "CREATE") {
    return (
      <EmpresaModalCreate
        open={open}
        onClose={close}
      />
    );
  }

  if (mode.type === "DELETE") {
    return (
      <EmpresaModalDelete
        id={mode.id}
        open={open}
        onClose={close}
      />
    );
  }

  return <EmpresaDrawer />;
}