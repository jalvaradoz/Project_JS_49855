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



/*------------- simulador interactivo!!! ---------------- */

let overlay = document.getElementById('logOverlay')

function toggleLog() {
    overlay.style.display = "block";
}
function closeLog(){
    overlay.style.display = "none";
}

let verify = true
let attempt = 0

function validateLogin(){
    let user1 = "joeyalvarado"
    let passUser1 = "12345"
    let user = document.getElementById('username').value.toLowerCase()
    let password = document.getElementById('password').value
    let verifyUser = document.getElementById('passVerify')

    do {
        if (user === "" || password === ""){
            verifyUser.style.display = "block"
            break
        }
        if (user === user1 && password === passUser1){
            alert("Welcome, " + user + " !")
            console.log("User: " + user)
            console.log("Password: " + password)
            verify = false
            closeLog()
        }
        if(user !== user1 || password !== passUser1){
            attempt++
            alert("Invalid user or password. You have " + attempt + " missed attempts")
            verify = false
        }
        if (attempt >= 3){
            alert("You have reached 3 attempts, exiting now.")
            closeLog()
            verify = false
        }
    } while (verify)
}


/*---------------------------------------------------------------*/





