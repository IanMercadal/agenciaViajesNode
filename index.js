import express from "express";
import dotenv from 'dotenv';
import router from './routes/index.js';
import db from './config/db.js';

// ─────────────────────────────────────────────
// 1. Cargar variables de entorno ANTES de todo
// ─────────────────────────────────────────────
console.log('🔧 Cargando variables de entorno...');
const envResult = dotenv.config({ path: "variables.env" });

if (envResult.error) {
    console.error('❌ Error al cargar variables.env:', envResult.error.message);
    process.exit(1);
}
console.log('✅ Variables de entorno cargadas');
console.log('   BD_NOMBRE:', process.env.BD_NOMBRE || '(no definida)');
console.log('   BD_HOST  :', process.env.BD_HOST   || '(no definida)');
console.log('   BD_PORT  :', process.env.BD_PORT   || '(no definida)');

// ─────────────────────────────────────────────
// 2. Validar variables de entorno requeridas
// ─────────────────────────────────────────────
const requiredEnvVars = ['BD_NOMBRE', 'BD_USER', 'BD_HOST', 'BD_PORT'];
// BD_PASS es opcional: puede estar vacía si MySQL no tiene contraseña
const optionalEnvVars = ['BD_PASS'];

const missingVars = requiredEnvVars.filter(v => process.env[v] === undefined);
const missingOptional = optionalEnvVars.filter(v => process.env[v] === undefined);

if (missingVars.length > 0 || missingOptional.length > 0) {
    console.error('❌ Faltan variables de entorno:', [...missingVars, ...missingOptional].join(', '));
    process.exit(1);
}

if (!process.env.BD_PASS) {
    console.log('⚠️  BD_PASS está vacía (MySQL sin contraseña). Continuando...');
}

// ─────────────────────────────────────────────
// 3. Crear la app de Express
// ─────────────────────────────────────────────
console.log('🚀 Inicializando Express...');
const app = express();

// ─────────────────────────────────────────────
// 4. Conectar la base de datos con logging detallado
// ─────────────────────────────────────────────
console.log('🔌 Conectando a la base de datos...');
db.authenticate()
    .then(() => {
        console.log('✅ Base de datos conectada correctamente');
    })
    .catch((error) => {
        console.error('❌ Error al conectar la base de datos:');
        console.error('   Nombre :', error.name);
        console.error('   Mensaje:', error.message);
        if (error.original) {
            console.error('   Código :', error.original.code);
            console.error('   SQL    :', error.original.sqlMessage || error.original.sql);
        }
        console.error('   Stack  :', error.stack);
        // No cerramos el proceso para que la app siga arrancando
        // y puedas ver el resto de errores en la consola
    });

// ─────────────────────────────────────────────
// 5. Configuración de Express
// ─────────────────────────────────────────────
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware: año actual y nombre del sitio
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

// Body parser para leer formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Carpeta pública
app.use(express.static('./public'));

// ─────────────────────────────────────────────
// 6. Routers
// ─────────────────────────────────────────────
console.log('🛣️  Cargando rutas...');
app.use('/', router);

// ─────────────────────────────────────────────
// 7. Middleware de errores (SIEMPRE al final)
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('❌ Error en una ruta:');
    console.error('   URL    :', req.originalUrl);
    console.error('   Mensaje:', err.message);
    console.error('   Stack  :', err.stack);
    res.status(500).send('Error interno del servidor');
});

// Ruta 404
app.use((req, res) => {
    res.status(404).send(`Ruta no encontrada: ${req.originalUrl}`);
});

// ─────────────────────────────────────────────
// 8. Arrancar el servidor
// ─────────────────────────────────────────────
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

const server = app.listen(port, host, () => {
    console.log('═══════════════════════════════════════');
    console.log(`✅ Servidor funcionando en http://${host}:${port}`);
    console.log('═══════════════════════════════════════');
});

// ─────────────────────────────────────────────
// 9. Manejo de errores globales
// ─────────────────────────────────────────────
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ El puerto ${port} ya está en uso`);
        console.error('   Cierra el proceso que lo usa o cambia el PORT en variables.env');
    } else {
        console.error('❌ Error del servidor:', error);
    }
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada sin manejar:');
    console.error('   Razón:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Excepción no capturada:');
    console.error('   Mensaje:', error.message);
    console.error('   Stack  :', error.stack);
    process.exit(1);
});