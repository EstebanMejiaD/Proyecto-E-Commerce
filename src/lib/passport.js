const passport =  require('passport');
const LocalStrategy = require('passport-local').Strategy
const pool = require('../database');
const helpers = require('../lib/helpers')


passport.use('local.login', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async (req, email, password, done)=> {
    
    const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            done(null, user, req.flash('success','Welcome' + user.email))
        } else {
            done(null, false, req.flash('message','Contraseña incorrecta.'))
        }
    } else {
        return done(null, false, req.flash('message','El usuario no existe'))
    }

}))


passport.use('local.singup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contraseña',
    passReqToCallback: true

}, async (req, email, password, done)=> {
    const { nombre, apellido, telefono } = req.body
    const newUser = {
        nombre,
        apellido,
        telefono,
        email,
        password,  
    }
    console.log(newUser)
    newUser.password =  await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertId;
    return done(null, newUser)
}));

passport.serializeUser((user, done)=> {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    return done(null, rows[0])
})