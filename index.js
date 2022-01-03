import express from "express";
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log("BBDD conectada"))
    .catch( error => console.log("Error"));

// Definir el puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
})


// Definir la carpeta publica
app.use(express.static('./public'));

// Agregar Router
app.use('/', router);

// CALLBACK
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});