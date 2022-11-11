/**
 * Este es el index de nuestra aplicacion, aquí se estará haciendo todo practicamente, desde el servidor hasta la importacion de la rutas
 */


// Requerimiento de modulos: 
const express = require('express')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySqlStore = require('express-mysql-session')
const passport = require('passport')


// initializations
const app = express()
require('./lib/passport')

const {database} = require('./keys')

//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}))
app.set('view engine', '.hbs')



//moddlewares
app.use(session({
    secret: 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database)
}))


// mensajes con flash
app.use(flash())
//morgan es para que muestre un tipo de mensaje por consola 
app.use(morgan('dev'))
// esto es para indicarle a Node que solo voy a estar aceptando datos sencillos, como string y así
app.use(express.urlencoded({extended: false}));
//para decirle a Node que tambien quisiera aceptar json (solo por si se necesita)
app.use(express.json())
//
app.use(passport.initialize())
app.use(passport.session())



// global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user;
    next()
})



//routes

//requiero el archivo index.js de la carpeta routes
app.use(require('./routes/index'))
//requiero el archivo authentication.js de la carpeta routes
app.use(require('./routes/authentication'))
//requiero el archivo links.js de la carpeta routes
app.use(require('./routes/shop'))





// public
app.use(express.static(path.join(__dirname, 'public')))
// mi carpeta publica esta aqui : /src/public




// starting the server
app.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'))
})

