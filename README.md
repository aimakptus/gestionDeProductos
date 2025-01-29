# Documentación del Proyecto

## Índice
- [Backend](#backend)
  - [Dependencias](#dependencias)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Autenticación](#autenticación)
- [Frontend](#frontend)
  - [Configuración Inicial](#configuración-inicial)
  - [Componentes Clave](#componentes-clave)
  - [Funcionalidades Principales](#funcionalidades-principales)

---

# Backend

## Dependencias

### Funcionamiento
| Paquete      | Uso                                  |
|--------------|--------------------------------------|
| Express      | Servidor y manejo de rutas           |
| Mongoose     | Conexión con MongoDB                 |
| Dotenv       | Gestión de variables de entorno      |
| JWT          | Autenticación con tokens             |
| Bcryptjs     | Encriptación de contraseñas          |
| Cors         | Habilitar CORS                       |

```bash
npm install express mongoose dotenv jsonwebtoken bcryptjs cors
```

### Desarrollo
```bash
npm install --save-dev nodemon  # Recarga automática del servidor
```

---

## Estructura del Proyecto
```plaintext
backend/
├── controllers/      # Lógica de negocio
├── models/           # Modelos de datos
├── routes/           # Definición de endpoints
├── middleware/       # Autenticación JWT
├── database.js       # Conexión a MongoDB
└── server.js         # Configuración del servidor
```

---

## Autenticación
- **JWT**: Todos los endpoints protegidos verifican el token en el header `Authorization`.
- **Middleware**: `auth.js` valida tokens y restringe acceso a rutas críticas.

```javascript
// Ejemplo de ruta protegida
router.get('/productos', auth, getProducts);
```

---

# Frontend

## Configuración Inicial
Creado con Vite + React:
```bash
npm create vite@latest
```

## Dependencias Principales
```bash
npm install axios react-router-dom react-toastify
```

---

## Componentes Clave

### Componentes de Autenticación
| Componente   | Función                                      |
|--------------|----------------------------------------------|
| `Login`      | Maneja inicio de sesión y almacena token     |
| `Register`   | Registra nuevos usuarios                     |

### Componentes Principales
| Componente       | Función                                      |
|------------------|----------------------------------------------|
| `Inventory`      | Tabla con búsqueda en tiempo real            |
| `EditProduct`    | CRUD completo de productos                   |
| `Header`         | Barra superior con logo y usuario            |
| `Footer`         | Enlace al repositorio                        |

---

## Funcionalidades Principales
1. **Búsqueda Instantánea**: Filtra productos mientras escribes en `Inventory`.
2. **CRUD de Productos**:
   - Crear nuevos productos (`Create`)
   - Editar existentes con doble clic (`Update`)
   - Eliminar con confirmación (`Delete`)
3. **Diseño Responsivo**: Adaptable a móviles y tablets.
4. **Notificaciones Visuales**: Feedback con `react-toastify`.

---

## Configuración de Entorno
### Backend (`.env`)
```env
MONGODB_URI=tu_cadena_de_conexión
PORT=5000
JWT_SECRET=tu_clave_secreta
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Ejecución del Proyecto
1. **Backend**:
```bash
cd backend
npm install
npm run dev
```

2. **Frontend**:
```bash
cd frontend
npm install
npm run dev
```

