/**
 * Este es el archivo donde estan todas las rutas pruncipales de la aplicacion
 */

// Requerimos los modulos
const express = require("express");
const router = express.Router();
const pool = require('../database')

router.get('/', (req, res)=> {
    res.render('principalPage/index.hbs')
})

router.get('/nosotros', async(req, res)=> {
    
    res.render('principalPage/nosotros.hbs')
})

module.exports = router;
