
alert(`Nota: ¡Leer primero el REDME.md!  Éste es un proyecto de desarrollo web: E-commerce, que tiene implementaciones de HTML, CSS, JavaScript y Boostrap 5`);
const userIcon = document.querySelector(`.user-icon-container`);
const asideLogin = document.querySelector(`.aside-login-e`);
const btnCart =  document.querySelector(`.button-cart`);
const closeLogin = document.querySelector(`.login-close`);
const closeIconAlert = document.querySelector(`.close-img-container`);
const alertLogin = document.querySelector(`.alert`);

userIcon.addEventListener(`click`, openAsideLogin);
closeLogin.addEventListener(`click`, closeAlideLogin);
closeIconAlert.addEventListener(`click`, closeAlertLogin);

function openAsideLogin() {
    asideLogin.classList.remove(`inactive`);
    
}

function closeAlideLogin() {
    asideLogin.classList.add(`inactive`);
}

function closeAlertLogin() {
    alertLogin.classList.add(`inactive`);
}



// lista de cuentas registradas
let Cuentas = [
    {
    nombre: "Victor",
    apellido: "De La Hoz",
    correo: "esteban@gmail.com",
    contraseña: "esteban12345"
    },
    {
    nombre: "Esteban",
    apellido: "mejia",
    correo: "victor@gmail.com",
    contraseña: "victor12345"
    },
];

