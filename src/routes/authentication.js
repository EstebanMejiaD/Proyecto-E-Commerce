/**
 * En este archivo estaran todas las rutas del registro y del login
 */

const express = require("express");
const router = express.Router();

const passport = require("passport");
const {isLoggedIn} =  require('../lib/auth')
// ruta al formulario del registro
router.get("/singup", (req, res) => {
  res.render("auth/singup.hbs");
});


// rupa para autenticar y registrar un usuario
router.post("/singup", passport.authenticate("local.singup", {
    successRedirect: "/profile",
    failureRedirect: "/singup",
    failureFlash: true
  }));

// ruta al formulario del login
router.get("/login", (req, res) => {
  res.render("auth/login.hbs");
});

router.post('/login', (req, res, next)=> {

    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})


//
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile/profile.hbs");
});

router.get('/logout', (req, res)=> {
    req.logOut();
    res.render('/login')
})

module.exports = router;
