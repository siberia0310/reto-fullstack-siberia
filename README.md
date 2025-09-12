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
│   └── serviceAccountKey.json (IGNORADO)
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

## 🛠️ Notas técnicas

- Arquitectura organizada en módulos (auth, tasks).
- Frontend separado de backend.
- Backend deployable en Firebase Functions (opcional).
- `.gitignore` incluye `node_modules/` y `serviceAccountKey.json`.

---

## 👩‍💻 Autora

**Siberia González** – Frontend Developer Senior (Angular, Tailwind, SSR, GraphQL)  
Este proyecto es un reto técnico de evaluación.
