/*-------------------------------- Custom modals ----------------------------------------- */

let customAlert = function(title,string){
    return async function(){
        return new Promise((resolve, reject) => {
            
            let alertContainer = document.createElement('div')
        
            alertContainer.innerHTML = `
            <div class="block fixed top-0 left-0 w-full h-full z-50 overlayCreated">
                <div class="alertShadow absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-3 rounded-3xl py-5 px-10 h-fit w-[500px] max-w-full">
                    <div class="flex flex-col gap-3 h-full w-full">
                        <h3 class="text-center text-lg">${title}</h3>
                        <p class="text-wrap">${string}</p>
                        <div class="relative">
                            <button id = "alertButton" class="alertButton float-end">Accept</button>
                        </div>
                    </div>
                </div>
            </div>`
            document.body.appendChild(alertContainer)

            alertContainer ? (document.getElementById('alertButton').addEventListener('click', ()=>{
                document.body.removeChild(alertContainer)
            }), resolve(true)) : reject(new Error('Error while creating modal'))
            })
    }
}

let customConfirm = function(title,string){
    return async function(){
        return new Promise((resolve, reject) => {

            alertContainer = document.createElement('div')
        
            alertContainer.innerHTML = `
            <div class="block fixed top-0 left-0 w-full h-full z-50 overlayCreated">
                <div class="alertShadow absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-3 rounded-3xl py-5 px-10 h-fit w-[500px] max-w-full">
                    <div class="flex flex-col gap-3 h-full w-full">
                        <h3 class="text-center text-lg">${title}</h3>
                        <p class="text-wrap">${string}</p>
                        <div class="flex gap-2 justify-end">
                            <button id = "confirmButton" class="alertButton float-end">Accept</button>
                            <button id = "denyButton" class="alertButton denyButton float-end">Deny</button>
                        </div>
                    </div>
                </div>
            </div>
            `
            document.body.appendChild(alertContainer)
    
            alertContainer ? (document.getElementById('confirmButton').addEventListener('click', ()=>{
                document.body.removeChild(alertContainer)
                resolve(true)
            }), document.getElementById('denyButton').addEventListener('click', ()=>{
                document.body.removeChild(alertContainer)
                resolve(false)
            }) ): reject(new Error('Error while creating modal'))
            })
    }
}




/*-------------------------- Header ------------------------------*/

// Este event listener valida si hay usuario validado o no, dependiendo de la respuesta agregara la seccion para que el usuario pueda hacer Log out


let userButton = document.getElementById('userButton').addEventListener('click', ()=>{
    toggleVisibility(switchValidationUser)
    validateLogin ? switchValidationUser.innerHTML = `
        <div class="fixed top-20 right-10 z-50">
            <div class="flex flex-col items-center rounded-full bg-[--bg] gap-4 py-7 px-5 border-[1.5px] border-[--black-50]">
                <h2 class="text-center font-medium text-base mb-3">${validateLogin.toUpperCase()}</h2>
                <button class="cancelBtn logoutBtn text-base relative" type="button" id="closeValidatedUser"><span class="text absolute top-[.46rem] left-4">Log Out</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
            </div>
        </div> ` : false 
    validateLogin ? document.getElementById('closeValidatedUser').addEventListener('click', ()=>{
        sessionStorage.removeItem('user')
        localStorage.removeItem('user')
        location.reload()
    }) : false
})


/*--------------Theme Switch ---------------*/

const body = document.body
let theme = localStorage.getItem('theme')
let checkbox = localStorage.getItem('checkbox')

document.getElementById('themeSwitch').addEventListener('click', () => {
    body.classList.replace(body.classList.contains('light') ? 'light' : 'dark', body.classList.contains('light') ? 'dark' : 'light')
    theme = localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark')
    checkbox = localStorage.setItem('checkbox', body.classList.contains('light') ? 'checked' : 'unchecked')
})

theme ? body.classList.add(theme) : false

themeSwitch.checked = checkbox === 'checked'


/*------------- Overlays---------------- */


let switchValidationUser = document.getElementById('switchValidationUser')
let cartOverlay = document.getElementById('cartOverlay')

function toggleVisibility(element){
    element.classList.toggle('hidden')
}

document.getElementById('closeLogin').addEventListener('click', ()=>{
    toggleVisibility(switchValidationUser)
})
document.getElementById('cartButton').addEventListener('click', ()=>{
    toggleVisibility(cartOverlay)
})
document.getElementById('closeCart').addEventListener('click', ()=>{
    toggleVisibility(cartOverlay)
})



/*-------------------------------- Log In, sign Up and cart----------------------------------------- */

const users = [
    {name:"joey", password:"123456", email:"joey@hotmail.com"},
    {name:"john", password:"584961", email:"john@hotmail.com"},
    {name:"albert", password:"458721", email:"albert@hotmail.com"},
    {name:"ada", password:"873427", email:"ada@hotmail.com"},
    {name:"admin", password:"admin1", email:"admin@hotmail.com"},
]

let validateLogin = sessionStorage.getItem('user') || localStorage.getItem('user')



/*------------- Log In ------------ */

// Este bloque hace validacion de usuario iterando sobre el array users con una funcion asincrona para esperar la respuesta del modal

document.getElementById('loginButton').addEventListener('click', async()=>{

    let userName = document.getElementById('username').value.toLowerCase()
    let userPassword = document.getElementById('password').value

    for(let validation of users){
        if ((userName === validation.name || userName === validation.email) && userPassword === validation.password) {
            toggleVisibility(switchValidationUser)
            const confirmLogin = await customConfirm('Log In successful <br>  Welcome ' + userName + ' !', 'Would you like to stay signed in?<br>')()

            switch(confirmLogin){
                case true: 
                validateLogin = localStorage.setItem('user',validation.name); break;

                default: validateLogin = sessionStorage.setItem('user',validation.name); break;
            }

            location.reload()
            return
        }
    }

    await customAlert('Error', 'User name or password incorrect, Try again')()
})



/*------------- Sign UP ------------ */

const registerUserName = document.getElementById('registerUserName')
const registerPassword = document.getElementById('registerPassword')
const confirmPassword = document.getElementById('confirmPassword')
const registerMail = document.getElementById('registerMail')
const confirmMail = document.getElementById('confirmMail')
const userDont = document.getElementById('userDont')
const passMeet = document.getElementById('passMeet')
const passEqual = document.getElementById('passEqual')
const mailMeet = document.getElementById('mailMeet')
const mailEqual = document.getElementById('mailEqual')

let userValidated = function(){
    let userValue = registerUserName.value.trim()

    if(userValue.length < 1){
        registerUserName.classList.add('isInvalid')
        userDont.classList.remove('hidden')
        return false
    }else{
        registerUserName.classList.remove('isInvalid')
        userDont.classList.add('hidden')
        return true
    }
}
let passwordValidated = function () {
    let passwordValue = registerPassword.value.trim()
    let passwordConfirm = confirmPassword.value.trim()
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,./;[\]{}])(?!.*\s).{8,16}$/

    if (!regex.test(passwordValue)) {
        registerPassword.classList.add('isInvalid')
        passMeet.classList.remove('hidden')
        return false       
    }else{
        passMeet.classList.add('hidden')
    }
    if(passwordValue !== passwordConfirm){
        registerPassword.classList.add('isInvalid')
        confirmPassword.classList.add('isInvalid')
        passEqual.classList.remove('hidden')
        return false
    }else{
        passEqual.classList.add('hidden')
    }

    registerPassword.classList.remove('isInvalid')
    confirmPassword.classList.remove('isInvalid')
    return true
}
let emailValidated = function() {
    let mailValue = registerMail.value.trim()
    let mailConfirm = confirmMail.value.trim()
    const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!mailRegex.test(mailValue)) {
        registerMail.classList.add('isInvalid')
        mailMeet.classList.remove('hidden')
        return false
    }else{
        mailMeet.classList.add('hidden')
    }
    if (mailValue !== mailConfirm) {
        registerMail.classList.add('isInvalid')
        confirmMail.classList.add('isInvalid')
        mailEqual.classList.remove('hidden')
        return false
    } else {
        mailEqual.classList.add('hidden')
    }
    confirmMail.classList.remove('isInvalid')
    registerMail.classList.remove('isInvalid')
    return true
}

registerUserName.addEventListener('change', userValidated)
registerPassword.addEventListener('change', passwordValidated)
confirmPassword.addEventListener('change', passwordValidated)
registerMail.addEventListener('change', emailValidated)
confirmMail.addEventListener('change', emailValidated)

document.getElementById('submitSignUP').addEventListener('click', async () =>{
    
    userValue = registerUserName.value.toLowerCase().trim()
    passwordValue = registerPassword.value.trim()
    passwordConfirm = confirmPassword.value.trim()
    mailValue = registerMail.value.toLowerCase().trim()
    mailConfirm = confirmMail.value.toLowerCase().trim()
    let signConditions = document.getElementById('signConditions')
    
    if (passwordValidated() === false || emailValidated() === false || userValidated === false) {
        await customAlert('Error While creating Account', 'Please make sure all fields are entered correctly')()
        signConditions.classList.add('text-red-400','font-bold')
        return
    }else if (users.some((validate) => validate.name === userValue)) {
        await customAlert('Error While creating Account', 'User name already exists. Please Log In')()
        return
    } else if (users.some((validate) => validate.email === mailValue)) {
        await customAlert('Error While creating Account', 'E-mail already exists. Please enter a different one')()
        return
    }

    users.push({ name: userValue, password: passwordValue, email: mailValue})
    await customAlert('Your Account has been created!', '<br>User: '  + userValue + '<br><br>E-Mail: ' + mailValue + '<br><br>Password: ' + passwordValue)()

    // Agregar aquí la lógica de redireccionamiento
})




/*---------------------------------------------------------------*/
