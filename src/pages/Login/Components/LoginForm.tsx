import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Todos los campos son obligatorios")
      return
    }

    try {
      const response = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", response.data.token)
      navigate("/search")
    } catch (err: any) {
      const detail = err.response?.data?.detail || ""
      if (detail.toLowerCase().includes("username") || detail.toLowerCase().includes("password")) {
        setError("Credenciales incorrectas, verifica tu email y contraseña")
      } else {
        setError(detail || "Error al iniciar sesión, intente de nuevo")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-fuchsia-100">
      <Card className="w-full max-w-sm bg-white shadow-xl">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>Ingresa tu email y contraseña para acceder</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit}>
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
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button type="submit" form="login-form" className="w-full bg-[#7c1fa0] hover:bg-[#6a1a8a] text-white">
            Iniciar sesión
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-[#7c1fa0] font-medium hover:underline">
              Regístrate
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginForm
