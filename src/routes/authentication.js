/**
 * En este archivo estaran todas las rutas del registro y del login
 */

const express = require("express");
const router = express.Router();

const passport = require("passport");
const {isLoggedIn, isNotLoggedIn} =  require('../lib/auth')
const pool = require("../database");


// ruta al formulario del registro
router.get("/singup",isNotLoggedIn,  (req, res) => {
  res.render("auth/singup.hbs");
});


// rupa para autenticar y registrar un usuario
router.post("/singup",isNotLoggedIn, passport.authenticate("local.singup", {
    successRedirect: "/profile",
    failureRedirect: "/singup",
    failureFlash: true
  }));

// ruta al formulario del login
router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("auth/login.hbs");
});

router.post('/login', isNotLoggedIn, (req, res, next)=> {

    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
})


//
router.get("/profile", isLoggedIn, async (req, res) => {
  const caritoActual = await pool.query("SELECT * FROM cartshop WHERE user_id = ?", [req.user.id]);
  const contadorCarrito = caritoActual.length;
  res.render("profile/profile.hbs", {contadorCarrito});
});

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
