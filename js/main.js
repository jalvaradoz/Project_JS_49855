/*--------------Theme Switch ---------------*/

const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

themeSwitch.addEventListener('change', () => {
    if (body.classList.contains('dark')) {
        body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

const theme = localStorage.getItem('theme');

if (theme) {
    body.classList.add(theme);
}



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
            break
        }
        if(user !== user1 || password !== passUser1){
            attempt++
            alert("Invalid user or password. You have " + attempt + " missed attempts")
            verify = false
        }
        if (attempt >= 3){
            alert("You have exceeded 3 attempts, exiting now.")
            verify = false
            closeLog()
            break
        }
    } while (verify)
}


/*---------------------------------------------------------------*/





