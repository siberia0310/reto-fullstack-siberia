# Reto Técnico – Fullstack Angular + Firebase

Este proyecto implementa un **CRUD de tareas** con autenticación básica de usuario.  
Frontend en Angular, Backend con Node.js/Express y **persistencia en Firebase Firestore**.

---

## 🚀 Tecnologías usadas

- Angular 18 (con NgModules, Reactive Forms, Routing, HttpClient)
- Node.js + Express + TypeScript
- Firebase Admin SDK + Firestore
- SCSS + Angular Material (para UI)
- RxJS, Observables y buenas prácticas SOLID

---

## 📂 Estructura del proyecto

```
reto-fullstack-siberia/
│── frontend/      → Aplicación Angular
│── backend/       → API Node/Express
│   ├── routes/    → Rutas de auth y tasks
│   ├── src/       → Configuración de servidor
│── firebase-data/ → Colecciones de ejemplo en JSON
│   ├── users.json
│   ├── tasks.json
│── firestore.rules
│── firestore.indexes.json
```

---

## ⚙️ Configuración

### 1. Clonar repositorio
```bash
git clone https://github.com/tu-usuario/reto-fullstack-siberia.git
cd reto-fullstack-siberia
```

### 2. Backend
```bash
cd backend
npm install
```

#### 🔑 Configurar Firebase

1. Entra a [Firebase Console](https://console.firebase.google.com/).
2. Crea un nuevo proyecto o usa el existente.
3. Ve a **Configuración del proyecto → Cuentas de servicio**.
4. Haz clic en **Generar nueva clave privada** → Esto descarga `serviceAccountKey.json`.
5. Copia ese archivo en la carpeta `backend/`.

⚠️ **Importante**: El archivo `serviceAccountKey.json` está en `.gitignore`.  
Nunca debe subirse a GitHub.

---

### 3. Frontend
```bash
cd frontend
npm install
ng serve
```

El frontend se servirá en `http://localhost:4200`.

---

## ▶️ Ejecutar Backend

```bash
cd backend
npm run dev
```

Por defecto corre en `http://localhost:4000`.

---

## 📌 Endpoints principales

- `POST /auth` → Crear usuario
- `GET /auth/:email` → Validar usuario
- `GET /tasks` → Listar tareas
- `POST /tasks` → Crear tarea
- `PUT /tasks/:id` → Actualizar tarea
- `DELETE /tasks/:id` → Eliminar tarea

---

## 🗄️ Datos de ejemplo (Firestore)

El proyecto incluye la carpeta **`/firebase-data/`** con colecciones de ejemplo en formato JSON (`users.json`, `tasks.json`).  

### 🔹 Contenido de `users.json`
```json
[
  {
    "email": "siberiagonzalez03@gmail.com",
    "createdAt": "2025-09-11T17:43:41.000Z"
  },
  {
    "email": "correo2@gmail.com",
    "createdAt": "2025-09-13T17:31:10.636Z"
  }
]
```

### 🔹 Contenido de `tasks.json`
```json
[
  {
    "id": "3v3ydBiMjLbqmiBUq55g",
    "title": "prueba fase 4",
    "description": "fase 4.11",
    "completed": false,
    "createdAt": "2025-09-13T17:31:10.636Z",
    "status": "pending"
  },
  {
    "id": "8rH7AQZkokewbxTMCAG",
    "title": "Segunda tarea",
    "description": "Descripción de ejemplo",
    "completed": true,
    "createdAt": "2025-09-12T10:15:30.000Z",
    "status": "done"
  }
]
```

### 🔹 Opción 1: Importar con Firefoo (recomendado)
1. Instalar [Firefoo](https://firefoo.app).
2. Conectarse a tu proyecto de Firebase.
3. Clic derecho en Firestore → **Import Collections**.
4. Seleccionar los archivos JSON de `/firebase-data/`.

### 🔹 Opción 2: Crear manualmente en Firebase Console

#### 1. Crear colección `users`
- Ir a **Firestore Database → Iniciar colección**.
- Nombre de colección: `users`.
- Crear documento con ID automático.
- Agregar los campos:
  - `email` (string) → `"siberiagonzalez03@gmail.com"`
  - `createdAt` (timestamp) → `2025-09-11T17:43:41.000Z`

Ejemplo:
```json
{
  "email": "siberiagonzalez03@gmail.com",
  "createdAt": "2025-09-11T17:43:41.000Z"
}
```

#### 2. Crear colección `tasks`
- Ir a **Firestore Database → Iniciar colección**.
- Nombre de colección: `tasks`.
- Crear documento con ID automático.
- Agregar los campos:
  - `id` (string) → `"3v3ydBiMjLbqmiBUq55g"`
  - `title` (string) → `"prueba fase 4"`
  - `description` (string) → `"fase 4.11"`
  - `completed` (boolean) → `false`
  - `createdAt` (timestamp) → `2025-09-13T17:31:10.636Z`
  - `status` (string) → `"pending"`

Ejemplo:
```json
{
  "id": "3v3ydBiMjLbqmiBUq55g",
  "title": "prueba fase 4",
  "description": "fase 4.11",
  "completed": false,
  "createdAt": "2025-09-13T17:31:10.636Z",
  "status": "pending"
}
```

Con estas dos colecciones ya tendrás un entorno de prueba listo para ejecutar el CRUD.

---

## 🛠️ Notas técnicas

- Arquitectura organizada en módulos (auth, tasks).
- Frontend separado de backend.
- Backend deployable en Firebase Functions (opcional).
- `.gitignore` incluye `node_modules/` y `serviceAccountKey.json`.

---

## 👩‍💻 Autora

**Siberia González** – Frontend Developer Senior (Angular, Tailwind, SSR, GraphQL)  
Este proyecto es un reto técnico de evaluación.
