import express from "express";
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log("BBDD conectada"))
    .catch( error => console.log("Error"));

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('./public'));

// Agregar Router
app.use('/', router);

/* PUERTO Y HOST PARA LA APP */
const host = process.env.HOST || '0.0.0.0';
// Definir el puerto
const port = process.env.PORT || 4000;

// CALLBACK
app.listen(port,host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});