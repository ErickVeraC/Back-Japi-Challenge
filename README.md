# 🎟️ Event Booking System – Sistema de Gestión de Eventos y Reservas

Una aplicación full-stack para crear, explorar y reservar eventos.  
A full-stack app to create, explore, and book events.

---

## 🧰 Tecnologías | Technologies

**Backend:**

- [NestJS](https://nestjs.com/) con TypeScript
- [MongoDB](https://www.mongodb.com/) usando Mongoose
- JWT para autenticación
- `class-validator` para validaciones robustas

**Frontend (no incluido en este repo):**

- [Next.js](https://nextjs.org/) + React
- Context API + Tailwind CSS

---

## 🚀 Instalación | Installation

1. Clona el repositorio / Clone the repository

```bash
git clone git@github.com:ErickVeraC/Back-Japi-Challenge.git
cd event-booking-backend
```

2. Instala dependencias / Install dependencies

```bash
npm install
```

3. Configura variables de entorno / Configure .env

Crea un archivo .env en la raíz con el siguiente contenido:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/events?retryWrites=true&w=majority
JWT_SECRET=supersecreto
```

4. Inicia el servidor / Start the server

```bash
npm run start:dev
```

Asegúrate de tener Mongo corriendo localmente o en MongoDB Atlas.

## 🔐 Autenticación | Authentication

Autenticación con JWT usando estrategia Bearer.

#### Registro / Register

##### POST /auth/register

```
json
{
  "email": "erick@example.com",
  "password": "securepass"
}
```

#### Login

##### POST /auth/login

```
json
{
  "email": "erick@example.com",
  "password": "securepass"
}
```

#### Obtener perfil / Get profile

##### GET /auth/me

##### 🔒 Requiere token

## 📆 Endpoints de Eventos | Event Endpoints

### Obtener todos los eventos / Get all events

##### GET /events

### Crear evento / Create event

##### POST /events 🔒

### Ver detalles de un evento / Get event by ID

##### GET /events/:id

### Editar evento / Update event

##### PUT /events/:id 🔒 Solo organizador / Only creator

### Eliminar evento / Delete event

##### DELETE /events/:id 🔒 Solo organizador / Only creator

## 🎟️ Endpoints de Reservas | Reservation Endpoints

### Reservar un evento / Book an event

##### POST /reservations/:eventId 🔒

### Cancelar reserva / Cancel reservation

##### DELETE /reservations/:eventId 🔒

### Ver mis reservas / View my reservations

##### GET /reservations/me 🔒

## ⚙️ Decisiones Técnicas | Technical Decisions

- Uso de modularización por dominio: auth, events, reservations

- DTOs validados con class-validator

- Seguridad con JWT + guards

- Concurrencia controlada en reservas usando transacciones (session)

- Uso de @nestjs/mapped-types para DTOs parciales

## 🧪 Pruebas Manuales | Manual Testing

Puedes usar Postman o ThunderClient:

1. Registrar un usuario

2. Hacer login y guardar token

3. Probar endpoints protegidos con Authorization: Bearer <token>

4. Crear eventos, reservar, cancelar, y listar

## 🧑‍💻 Autor | Author

### Erick The Coder - Fullstack JS Developer

#### 📍 Ciudad de México

#### 💬 Contacto: opcional, tú decides si lo pones

## 📄 Licencia | License

Este proyecto es parte de una prueba técnica. Uso libre solo con fines educativos.
This project was developed as part of a technical challenge. Free to use for learning purposes only.
