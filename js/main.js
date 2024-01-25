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
    body.classList.add(theme)
}
themeSwitch.checked = checkboxChecked === 'checked'



/*---------------------------------------------------------------*/




/*---------------Segunda preentrega----------------*/

const users = [
    {name: "admin", password: "admin1"},
    {name: "joey", password: "123456"},
]

let signUp = function (){
    
    let signUpCicle = true 
    
    do{
        class userBuilder{
            constructor (name,password){
                this.name = name
                this.password = password
            }
        }
        
        let userName = prompt("Enter your first name")
        
        while(users.some( (x) => x.name === userName)){
            alert("User Name already exists, provide another one")
            userName = prompt("Enter your first name")
        }
        while(userName === null){
            if (confirm("Are you sure you want to cancel?")) {
                alert("Operation cancelled, returning to main screen")
                break
            }
            userName = prompt("Enter your first name")
        }
        if(userName === null){
            break
        }
        while(userName.length === 0){
            alert("Please enter a valid user name")
            userName = prompt("Enter your first name")
        }
        userName = userName.toLowerCase().trim()
    
        let userPassword = prompt("Enter your Password, at least 5 characters long")
        
        while(userPassword === null){
            if (confirm("Are you sure you want to cancel?")) {
                alert("Operation cancelled, returning to main screen")
                break
            }
            userPassword = prompt("Enter your Password, at least 5 characters long")
        }
        if(userPassword === null){
            break
        }
        while(userPassword.length < 5){
            alert("Please enter a valid password, needs to be at least 5 characters long")
            userPassword = prompt("Enter your Password")
        }
        userPassword = userPassword.trim()
    
        let newUser = new userBuilder(userName, userPassword)
    
        users.push(newUser)
    
        alert("Your Account has been created!\n\nUser: " + userName + "\n\nPassword: " + userPassword)
    
        if(confirm("Would you like to sign in now?")){
            if(logIn()){
                return true
            }
        }else{
            return true
        }
    }while(signUpCicle)
}



let logIn = function (){
    let attempt = 1
    let verify = true
    do{
        let user = prompt("LOG IN\n\nRemember: you only have 3 attempts to log In\n\nPlease enter User name:")

        while (user === null) {
            if (confirm("Are you sure you want to cancel?")) {
                alert("Operation cancelled, returning to main screen")
                break
            }
            user = prompt("Enter User name:")
        }
        if (user === null) {
            break
        }
        while (user.length === 0) {
            alert("Enter a valid user name")
            user = prompt("Enter User name:")
        }

        user = user.toLowerCase().trim()

        let password = prompt("Enter Password:")

        while (password === null) {
            if (confirm("Are you sure you want to cancel?")) {
                alert("Operation cancelled, returning to main screen")
                break
            }
            password = prompt("Enter Password:")
        }
        if (password === null) {
            break
        }
        while (password.length === 0) {
            alert("Enter a valid user password")
            password = prompt("Enter Password:")
        }

        for (let i = 0; i < users.length; i++) {
            if (user === users[i].name && password === users[i].password) {
                alert("Welcome, " + user + " !")
                console.log("User: " + user)
                console.log("Password: " + password)
                verify = false
                return true
            }
        }
        if(user.length === 0 || password.length === 0) {
            break
        }else{
            alert("User name or password incorrect, you have " + attempt + " missed attempts.")
            attempt++
        }
        if (attempt > 3) {
            alert("You've reached 3 attempts, exiting now.")
            verify = false
            return true
        }
    }while(verify)
}

function validateLogin() {

    let verifyLog = true
    do{
        let welcome = prompt("                                    Welcome to Alter Jewelry \n\n Please enter below the NUMBER of the action you'd like to follow:\n\n 1. Log In \n 2. Sign Up \n\n")

        if (welcome === null) {
            break
        }else if(welcome == 1){
            if(logIn()){
                verifyLog = false
            }
        }else if(welcome == 2){
            if(signUp()){
                verifyLog = false
            }
        }else {
            alert("Please enter a valid NUMBER")
        }
    }while(verifyLog)
}

validateLogin()


/*---------------------------------------------------------------*/

let lista = [
    {marca:"lenovo", precio: 350, stock: 5},
    {marca:"samsung", precio: 500, stock: 10},
    {marca:"mac", precio: 750, stock: 1},
]

function filtrarProducto(){
    let palabraClave= prompt("ingresa producto que queres buscar").trim()
    let resultado = lista.filter( (x)=> x.marca.includes(palabraClave))
    if(resultado.length >0){
        alert("Existe el producto " + palabraClave)
        console.table(resultado)
    }else{
        alert("no se encontro ninguna conincidencia con " + palabraClave)
        if(confirm("desea agregar el producto?")){
            let establecerPrecio = parseFloat(prompt("Ingresa el precio del producto"))
            while(isNaN(establecerPrecio)){
                alert("Ingresa el monto en numeros, puede contener decimales")
                establecerPrecio = parseFloat(prompt("Ingresa el precio del producto"))
            }
            let establecerStock = parseInt(prompt("Ingresa el stock para el producto"))
            while(isNaN(establecerStock)){
                alert("Ingresa el monto en numeros, NO puede contener decimales")
                establecerStock = parseInt(prompt("Ingresa el stock para el producto"))
            }
            let agregar = {marca: palabraClave, precio: establecerPrecio, stock:establecerStock}
            lista.push(agregar)
            console.table(lista)
        }else{
            return false
        }
    }
}