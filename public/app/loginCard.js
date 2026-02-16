
/* === LOGIN */
/* VISIBILIDAD DE LA VENTANIDA POP-UP EN LAS PÁGINAS */
const dialogLogin = document.getElementById("login-dialog");
const wrapper = document.querySelector(".areaDelLogin");

const visibilidadDialog = (show) => dialogLogin.style.display = show ? "flex" : "none";

/* === REGISTRO */
/* VISIBILIDAD COSA PARA REGISTRAR (CREAR CUENTA) */
const dialogRegistro = document.getElementById("register-dialog");
dialogRegistro.style.display = "none";
const wrapperRegister = document.querySelector(".areaDelRegistro");

const visibilidadRegistro = (show) => dialogRegistro.style.display = show ? "flex" : "none";

/* === LOGIN */
/* INTERCAMBIO DE ELEMENTOS */
const intercambioElementos = () => {
    if (dialogLogin.style.display === "flex") {
        visibilidadDialog(false);
        visibilidadRegistro(true);
    } else {
        visibilidadDialog(true);
        visibilidadRegistro(false);
    }
};

visibilidadDialog(true);
visibilidadRegistro(false);


/* === CANCELAR */
/* BOTONES CANCELAR */
const cancelarLogin = document.getElementById("cancelarLogin");
const cancelarRegistro = document.getElementById("cancelarRegistro");

/* INPUTS LOGIN */
const loginCorreoInput = document.getElementById("loginCorreoInput");
const loginContrasenaInput = document.getElementById("loginContrasenaInput");

/* LIMPIAR LOGIN */
cancelarLogin.addEventListener("click", () => {
  loginCorreoInput.value = "";
  loginContrasenaInput.value = "";
});

/* LIMPIAR REGISTRO */
cancelarRegistro.addEventListener("click", () => {
  registroUserInput.value = "";
  registroCorreoInput.value = "";
  registroContrasenaInput.value = "";
});