import express from 'express';

const router = express.Router();

router.get('/', (req, res) => { // req -> Lo que enviamos : res -> lo que nos responde
    res.render('inicio');
});
router.get('/nosotros', (req, res) => { // req -> Lo que enviamos : res -> lo que nos responde
    res.render('nosotros');
});

export default router;