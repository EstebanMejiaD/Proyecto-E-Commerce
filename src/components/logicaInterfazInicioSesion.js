const login =  document.querySelector("#login");

login.addEventListener("click", ()=> {
    let sCorreo = "";
    let sContraseña = "";
    let bAcceso = false;

    sCorreo = document.querySelector("#email").value;
    sContraseña = document.querySelector("#pass").value;
     
    bAcceso = validarCredenciales(sCorreo, sContraseña);

    if (bAcceso === true) {
        window.location.href = "index.html";
    }else if (bAcceso === false) {
        let mensajeFalso = document.createElement("SMALL");
        mensajeFalso.innerHTML = "¡Usuario o contraseñas incorrectas!";
       const divAlertSesionFalse = document.querySelector("#alertSesionFalse");
       divAlertSesionFalse.appendChild(mensajeFalso);
       
    }
});









