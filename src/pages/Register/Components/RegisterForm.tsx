import { useState } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSummit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstname || !lastname || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 8) {
      setError("Contraseña débil, mínimo 8 caracteres");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("La contraseña debe contener al menos una letra mayúscula");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("La contraseña debe contener al menos un número");
      return;
    }

    try {
      await api.post("/users/register", {
        email,
        firstName: firstname,
        lastName: lastname,
        password,
      });
      setError("");
      setSuccessMessage("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-fuchsia-100">
      <Card className="w-full max-w-sm bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-[#7c1fa0]">Crear cuenta</CardTitle>
          <CardDescription>Completa los campos para registrarte</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={handleSummit}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">Nombre</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Juan"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Apellido</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Pérez"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres, una mayúscula y un número"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              {successMessage && (
                <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  {successMessage}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button
            type="submit"
            form="register-form"
            className="w-full bg-[#7c1fa0] hover:bg-[#6a1a8a] text-white"
          >
            Registrarse
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-[#7c1fa0] font-medium hover:underline">
              Inicia sesión
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterForm;
