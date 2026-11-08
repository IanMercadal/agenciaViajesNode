# 🌎 Agencia de Viajes

Aplicación web full stack para explorar destinos de viaje y consultar opiniones de otros viajeros. Construida con **Node.js**, **Express** y **MySQL** siguiendo la arquitectura **MVC**.

> 📌 Proyecto de 2022, desarrollado como pieza de portafolio para acceder a las prácticas del Grado Superior en Desarrollo de Aplicaciones Web (DAW).

## ✨ Funcionalidades

- Listado de destinos de viaje y página de detalle de cada viaje.
- Sección de testimoniales: los usuarios pueden dejar su opinión.
- Renderizado en servidor con plantillas **PUG**.
- Persistencia en **MySQL** mediante **Sequelize** (ORM).

## 🛠️ Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| Backend | Node.js, Express |
| Base de datos | MySQL, Sequelize (ORM) |
| Frontend | PUG, CSS |
| Configuración | Dotenv |
| Desarrollo | Nodemon |

## 🏗️ Arquitectura

El proyecto sigue el patrón **MVC**:

- **Modelos:** definición de tablas y relaciones con Sequelize.
- **Vistas:** plantillas PUG.
- **Controladores:** lógica de cada ruta.

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) 16 o superior
- [MySQL](https://www.mysql.com/) 8 o superior
- npm

## 🚀 Instalación y ejecución en local

### 1. Clonar e instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd agenciaViajesNode
npm install
```

### 2. Preparar la base de datos

Crea la base de datos desde tu cliente MySQL:

```sql
CREATE DATABASE agencia_viajes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Después importa los scripts SQL incluidos en el proyecto (tablas de **viajes** y **testimoniales**):

```bash
mysql -u <usuario> -p agencia_viajes < <ruta/al/script_viajes.sql>
mysql -u <usuario> -p agencia_viajes < <ruta/al/script_testimoniales.sql>
```

### 3. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_NOMBRE=agencia_viajes
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_HOST=localhost
DB_PORT=3306
```

> ⚠️ No subas el archivo `.env` al repositorio. Comprueba que está en tu `.gitignore`.

### 4. Arrancar la aplicación

```bash
# Desarrollo (con recarga automática)
npm run dev

# Producción
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## 📁 Estructura del proyecto

```text
agenciaViajesNode/
├── config/         # Conexión a la base de datos
├── controllers/    # Lógica de las rutas
├── models/         # Modelos de Sequelize
├── routes/         # Definición de rutas
├── views/          # Plantillas PUG
├── public/         # CSS, imágenes y archivos estáticos
└── index.js        # Punto de entrada
```

## 🔮 Posibles mejoras

- Validación de formularios en servidor.
- Panel de administración para gestionar viajes.
- Tests automatizados.
- Despliegue con Docker.

## 👤 Autor

**Ian** · [GitHub](https://github.com/<tu-usuario>)