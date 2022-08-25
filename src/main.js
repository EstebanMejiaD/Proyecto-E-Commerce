

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
