# Fly Away ✈️ — Frontend

Aplicación web para reserva de vuelos construida con React + TypeScript, que consume la API REST de Fly Away.

## Requisitos previos

- Node.js 18+
- pnpm (o npm)
- El backend corriendo en `http://localhost:8080`

## Cómo correr el proyecto

```bash
# 1. Instalar dependencias
pnpm install

# 2. Correr en modo desarrollo
pnpm dev
```

La app estará disponible en `http://localhost:5173`.

## Iniciar el backend primero

```bash
# En la carpeta del backend:
./mvnw spring-boot:run
```

## Funcionalidades

- Registro e inicio de sesión con JWT
- Búsqueda de vuelos por número, aerolínea y rango de fechas
- Reserva de vuelos con manejo de errores del backend
- Vista de reservas del usuario con detalle por reserva
- Rutas protegidas para usuarios autenticados

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Estilos | Tailwind CSS v4 + shadcn/ui |
| HTTP client | Axios |
| Routing | React Router v7 |
