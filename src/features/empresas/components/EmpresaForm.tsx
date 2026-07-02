import { useState } from 'react';
import { api } from '../../../api/api';


import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface EmpresaFormProps {
  onEmpresaCreada: () => void;
}

export default function EmpresaForm({
  onEmpresaCreada,
}: EmpresaFormProps) {

  const [razonSocial, setRazonSocial] =
    useState<string>('');

  const [cuit, setCuit] =
    useState<string>('');

  const [email, setEmail] =
    useState<string>('');

  const [telefono, setTelefono] =
    useState<string>('');

  const [direccion, setDireccion] =
    useState<string>('');

  const [nombre, setNombre] =
    useState<string>('');

  const [apellido, setApellido] =
    useState<string>('');

  const [usuarioEmail, setUsuarioEmail] =
    useState<string>('');

  const [password, setPassword] =
    useState<string>('');

  const guardarEmpresa = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      const payload = {
        razon_social: razonSocial,
        cuit,
        email,
        telefono,
        direccion,
        nombre,
        apellido,
        usuario_email: usuarioEmail,
        password,
      };

      console.log(payload);

      await api.post(
        '/admin-saas/empresas',
        payload,
      );

      alert('Empresa creada correctamente');

      setRazonSocial('');
      setCuit('');
      setEmail('');
      setTelefono('');
      setDireccion('');
      setNombre('');
      setApellido('');
      setUsuarioEmail('');
      setPassword('');

      onEmpresaCreada();

    } catch (error: any) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        'Error al crear empresa'
      );
    }
  };

return (
  <Card className="border-0 shadow-none bg-transparent">
    <CardContent className="p-0">
      <form onSubmit={guardarEmpresa} className="space-y-8">

        {/* Datos Empresa */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Datos de la Empresa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="razonSocial">Razón Social</Label>
              <Input
                id="razonSocial"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                placeholder="Mi Empresa SRL"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cuit">CUIT</Label>
              <Input
                id="cuit"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                placeholder="20-12345678-9"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailEmpresa">Email</Label>
              <Input
                id="emailEmpresa"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="empresa@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="3624..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección"
              />
            </div>

          </div>
        </section>

        {/* Administrador */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Administrador Inicial
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usuarioEmail">Email Administrador</Label>
              <Input
                id="usuarioEmail"
                type="email"
                value={usuarioEmail}
                onChange={(e) => setUsuarioEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña Inicial</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

          </div>
        </section>

        <Button type="submit">
          Guardar Empresa
        </Button>

      </form>
    </CardContent>
  </Card>
);
}