/*Theme Switch */

const themeSwitch = document.getElementById('themeSwitch')
const body = document.body

themeSwitch.addEventListener('change', () => {

    if (body.classList.contains('dark')) {
        body.classList.replace('dark', 'light');
        localStorage.setItem('theme','light')
    } else {
        body.classList.replace('light', 'dark');
        localStorage.setItem('theme','dark')
    }
});

const theme = localStorage.getItem('theme')

if (theme) {
    body.classList.add('theme')
}








/* ejercicios */


/* let verify = true

alert("I sell something, put offer in")

let baseOffer = 2000
let attempt = 1

do{
    if(attempt >2){
        alert("you overpass the 2 attempts")
        alert("you lose!")
        break
    }

    let userOffer = parseFloat(prompt("put offer here")) 

    if (isNaN(userOffer) && attempt <=2) {
        alert("Please enter a valid number.") 
    }
    else if(userOffer >= baseOffer && attempt <=2) {
        alert("you win!")
        verify = false
        console.log("you win!")
    }
    else if(userOffer > 0 && userOffer <2000 && attempt <=2) {
        alert("offer more")
        attempt ++
    }
}while(verify) */


/* for (let i = 0; i <= 5; i++) {
    console.log("estoy contando " + i)
} */

/* let verify = true
let attempt = 0

do{
    let user1 = "joey alvarado"
    let passUser1 = "12345"

    if(attempt >=3){
        alert("you overpassed 3 attempts, exiting now.")
        break
    }

    let user = prompt("enter User Name")
    
    if(user == ""){
        alert ("please enter a valid user name")
        continue
    }
    else if (user === null) {
        alert("Operation canceled. Exiting now.")
        verify = false
        break
    }

    user = user.toLowerCase()

    let paswword = prompt("enter Password")
    
    if (paswword === null) {
        alert("Operation canceled. Exiting now.")
        verify = false
        break
    }
    
    if(user != user1 || paswword != passUser1){
        alert("invalid user or password")
        attempt ++
        console.warn("you have " + attempt + " missed attempts")
    }
    if(user == user1 && paswword === passUser1){
        alert ("welcome! "+ user1)
        console.log(user)
        console.log(paswword)
        break
    }
}while(verify) */



/* alert("bienvenidos a la concesionaria")

let consulta = confirm("te puedo ayudar a buscar un coche?")

if(consulta===true){

    let coche = prompt("que coche buscas?")
    let color = prompt("elige el color de tu "+coche)
    
    
    switch(color){

        case "blanco":
        case "negro":
        case "azul":
        case "naranja":
            alert("tenemos "+ coche + " en color " + color)
            let purchase = confirm("¿Quieres comprarlo?");
            
            if (purchase) {
                alert("¡Gracias por comprar!");
            }
            break;
        default:
            alert("no tenemos " + coche + " en ese color");
        
    }
} */
