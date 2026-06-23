import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const token = localStorage.getItem("token");

  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "{}"
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.rol !== "ADMIN_SAAS") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}