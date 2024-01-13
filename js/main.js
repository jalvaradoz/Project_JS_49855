/*--------------Theme Switch ---------------*/

const themeSwitch = document.getElementById('themeSwitch')
const body = document.body
const theme = localStorage.getItem('theme')
const checkboxChecked = localStorage.getItem('checkboxChecked')

themeSwitch.addEventListener('change', () => {
    if (body.classList.contains('dark')) {
        body.classList.replace('dark', 'light')
        theme = 'light'
    } else {
        body.classList.replace('light', 'dark')
        theme = 'dark'
    }
})

if (theme) {
    body.classList.add(theme);
}
themeSwitch.checked = checkboxChecked === 'checked';

/* let overlay = document.getElementById('logOverlay')
let cart = document.getElementById('cartOverlay')

function toggleCart(){
    cart.style.display = "block"
}
function closeCart(){
    cart.style.display = 'none'
}
function toggleLog() {
    overlay.style.display = "block"
}
function closeLog(){
    overlay.style.display = "none"
} */




/*------------- simulador interactivo!!! ---------------- */


/* function validateLogin() {
    let user1 = "joeyalvarado"
    let passUser1 = "12345"
    let attempt = 0

    while (attempt < 3) {
        let user = prompt("Ingrese su nombre de usuario:").toLowerCase()
        let password = prompt("Ingrese su contraseña:")

        if (user === user1 && password === passUser1) {
            alert("¡Bienvenido, " + user + "!")
            console.log("Usuario: " + user)
            console.log("Contraseña: " + password)
            return
        } else if (user === "" || password === "") {
            alert("Por favor, ingrese tanto el nombre de usuario como la contraseña.")
        } else {
            attempt++
            alert("Usuario o contraseña incorrectos. Te quedan " + (3 - attempt) + " intentos.")
        }
    }
    if (attempt >= 3) {
        alert("Has alcanzado 3 intentos, saliendo ahora.")
    }
} */
function validateLogin() {
    let user1 = "joeyalvarado"
    let passUser1 = "12345"
    let attempt

    for (attempt = 1; attempt <= 3; attempt++) {
        let user = prompt("Enter User name:").toLowerCase()
        let password = prompt("Enter Password:")

        if (user === user1 && password === passUser1) {
            alert("Welcome, " + user + "!")
            console.log("Usuario: " + user)
            console.log("Contraseña: " + password)
            return
        } else if (user === "" || password === "") {
            alert("Enter a valid user name or password.")
            attempt++
        } else {
            alert("User name or password incorrect, you have " + attempt + " missed attempts.");
        }
    }
    if (attempt = 3) {
        alert("You've reached 3 attempts, exiting now.");
    }
}

validateLogin()

/*---------------------------------------------------------------*/

