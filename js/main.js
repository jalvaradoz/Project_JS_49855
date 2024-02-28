/*-------------------------------- Custom modals ----------------------------------------- */

const Toast = Swal.mixin({
    customClass: {
        popup: 'rounded-3xl mb-5 ml-1',
    },
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    background: "#4f4f4f",
    color: "#f6f6f6",
    padding: '20px 20px 20px 20px',
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
})

const customModal = Swal.mixin({
    customClass: {
        confirmButton: "alertButton",
        cancelButton: "alertButton denyButton",
        popup: 'rounded-3xl',
    },
    buttonsStyling: false,
    background: "#454545",
    color: "#f6f6f6",
    showCancelButton: true,
    confirmButtonText: "Accept",
    cancelButtonText: "Deny",
    icon: "question",
    padding: '0 0 2rem 0',
})


/*-------------------------- Header ------------------------------*/


/*--------------Theme Switch ---------------*/

const body = document.body
let theme = localStorage.getItem('theme')
let checkbox = localStorage.getItem('checkbox')

document.getElementById('themeSwitch').addEventListener('click', () => {
    body.classList.replace(body.classList.contains('light') ? 'light' : 'dark', body.classList.contains('light') ? 'dark' : 'light')
    theme = localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark')
    checkbox = localStorage.setItem('checkbox', body.classList.contains('light') ? 'checked' : 'unchecked')
})

theme && body.classList.add(theme)

themeSwitch.checked = checkbox === 'checked'


/*------------- Overlays---------------- */


let switchValidationUser = document.getElementById('switchValidationUser')
let cartOverlay = document.getElementById('cartOverlay')
let searchOverlay = document.getElementById('searchOverlay')

function toggleVisibility(element){
    element.classList.toggle('hidden')
}

document.getElementById('closeLogin').addEventListener('click', ()=>{
    toggleVisibility(switchValidationUser)
})
let cartButton = document.getElementById('cartButton').addEventListener('click', ()=>{
    toggleVisibility(cartOverlay)
})
document.getElementById('closeCart').addEventListener('click', ()=>{
    toggleVisibility(cartOverlay)
})
document.getElementById('closeSearchBtn').addEventListener('click', ()=>{
    toggleVisibility(searchOverlay)
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

// Este event listener valida si hay usuario validado o no, dependiendo de la respuesta agregara la seccion para que el usuario pueda hacer Log out


let userButton = document.getElementById('userButton').addEventListener('click', ()=>{
    toggleVisibility(switchValidationUser)
    validateLogin && (switchValidationUser.innerHTML = `
        <div class="fixed top-20 right-10 z-50">
            <div class="flex flex-col items-center rounded-full bg-[--bg] gap-4 py-7 px-5 border-[1.5px] border-[--black-50]">
                <h2 class="text-center font-medium text-base mb-3">${validateLogin.toUpperCase()}</h2>
                <button class="cancelBtn logoutBtn text-base relative" type="button" id="closeValidatedUser"><span class="text absolute top-[.46rem] left-4">Log Out</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
            </div>
        </div> `)  
    validateLogin && document.getElementById('closeValidatedUser').addEventListener('click', ()=>{
        sessionStorage.removeItem('user')
        localStorage.removeItem('user')
        location.reload()
    })
})



/*------------- Log In ------------ */

// Este bloque hace validacion de usuario iterando sobre el array users y verificando si un usuario registrado ya existe; con una funcion asincrona para esperar la respuesta del modal, al mismo tiempo evalua si hay un usuario registrado en el local storage y lo convierte de vuelta a objeto para validacion posterior

let userExists = localStorage.getItem('localUser')
let userBacktoObject = userExists ? JSON.parse(userExists) : null
if (userBacktoObject) {
    users.push(userBacktoObject)
}

document.getElementById('loginButton').addEventListener('click', async()=>{

    let userName = document.getElementById('username').value.toLowerCase()
    let userPassword = document.getElementById('password').value

    for(let validation of users){
        if (userName.length < 1 || userPassword.length < 1) {
            toggleVisibility(switchValidationUser)
            await customModal.fire({
                title: 'Not valid',
                text: 'Please enter both user name and password',
                icon: 'error',
                showCancelButton: false,
            })
            toggleVisibility(switchValidationUser)
            return
        }else if ((userName === validation.name || userName === validation.email) && userPassword === validation.password) {
            toggleVisibility(switchValidationUser)

            const confirmLogin = await customModal.fire({
                title: `Log In successful,  Welcome ${userName} !`,
                text: 'Would you like to stay signed in?',
                icon: 'success',
            })
            if (confirmLogin.isConfirmed) {
                localStorage.setItem('user',validation.name)
            } else if (confirmLogin.dismiss) {
                sessionStorage.setItem('user',validation.name)
            }
            await customModal.fire({
                title: '',
                text: 'Enjoy your time on Alter Jewelry',
                icon: '',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            })
            location.reload()
            return
        }
    }
    await customModal.fire({
        title: 'Error',
        text: 'User name or password incorrect, Try again',
        icon: 'error',
        showCancelButton: false,
    })
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
    }
    registerUserName.classList.remove('isInvalid')
    userDont.classList.add('hidden')
    return true
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
    }else{
        mailEqual.classList.add('hidden')
    }
    confirmMail.classList.remove('isInvalid')
    registerMail.classList.remove('isInvalid')
    return true
}

// si la seccion sign up existe , entonces se ejecuta este codigo 

let sigupPage = document.getElementById('signUpSection')

if(sigupPage){
    registerUserName.addEventListener('blur', userValidated)
    registerPassword.addEventListener('blur', passwordValidated)
    confirmPassword.addEventListener('blur', passwordValidated)
    registerMail.addEventListener('blur', emailValidated)
    confirmMail.addEventListener('blur', emailValidated)

    document.getElementById('submitSignUP').addEventListener('click', async () =>{
    
        userValue = registerUserName.value.toLowerCase().trim()
        passwordValue = registerPassword.value.trim()
        passwordConfirm = confirmPassword.value.trim()
        mailValue = registerMail.value.toLowerCase().trim()
        mailConfirm = confirmMail.value.toLowerCase().trim()
        let signConditions = document.getElementById('signConditions')
        
        if (!userValidated() || !passwordValidated() || !emailValidated()) {
            await customModal.fire({
                title: 'Error while creating account',
                text: 'Please make sure all fields are entered correctly',
                icon: 'error',
                showCancelButton: false,
            })
            signConditions.classList.add('text-red-400','font-bold')
            return
        }else if (users.some(validate=> validate.name === userValue) || users.some(validate=> validate.email === mailValue)) {
            let confirm = await customModal.fire({
                title: 'Account already exists',
                text: 'User name already exists. Would you like to Log In?',
                icon: 'info',
            })
            confirm.isConfirmed ? toggleVisibility(switchValidationUser) : false 
            return
        }
        let setNewUser = {name: userValue, password: passwordValue, email: mailValue}

        localStorage.setItem('localUser', JSON.stringify(setNewUser))
        sessionStorage.setItem('user', userValue)

        await customModal.fire({
            title: 'Your Account has been created!',
            html: `User: ${userValue}<br><br>E-Mail: ${mailValue}<br><br>Password: ${passwordValue}<br><br>You are signed in now !`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: `Great!`,
        })
        window.location.assign("../index.html")
    })
}

/*------------- CART ------------ */

// un for each para  hacer una copia de array por cada uno de los product containers que ademas sabe cuando un producto existe para no crear uno nuevo si no solo agregar cantidad

let cartProducts = []

const productContainers = document.querySelectorAll('.productPreview')
const cartFooter = document.getElementById('cartFooter')
const checkoutBtn = document.getElementById('checkoutBtn')

productContainers.forEach(productContainer => {
    productContainer.addEventListener('click', e => {
        const cartBtn = e.target.closest('.CartBtn')
        if(cartBtn){

            const infoProduct = {
                quantity: 1,
                image: productContainer.querySelector('.mainImage').src,
                title: productContainer.querySelector('.productTitle').textContent,
                price: productContainer.querySelector('.productPrice').textContent,
            }
            const exists = cartProducts.some(product => product.title === infoProduct.title)

            if(exists){
                const products = cartProducts.map(product =>{
                    if(product.title === infoProduct.title){
                        product.quantity++
                        return product
                    }else{
                        return product
                    }
                })
                cartProducts = [...products]
                validateLogin ? localStorage.setItem('existingCart', JSON.stringify(cartProducts)) : sessionStorage.setItem('existingCart', JSON.stringify(cartProducts))
                Toast.fire({ icon: "success", title: `Another ${infoProduct.title} was added to the cart!` })
            }else{
                cartProducts = [...cartProducts, infoProduct]
                validateLogin ? localStorage.setItem('existingCart', JSON.stringify(cartProducts)) : sessionStorage.setItem('existingCart', JSON.stringify(cartProducts))
                Toast.fire({ icon: "success", title: `${infoProduct.title} added to the cart!` })
            }
            addToCart()
        }
    })
})

// codigo que elimina el producto que sea distinto a cualquier otro producto que pueda haber en el carrito ademas de actualizar el local storage para el carrito guardado

let cartProductsAdded = document.getElementById('cartProductsAdded')
const itemsNumber = document.getElementById('itemsNumber')
const subTotalCart = document.getElementById('subTotalCart')
const finalPrice = document.getElementById('finalPrice')

cartProductsAdded.addEventListener('click', e => {
    const button = e.target.closest('.bin-button')
    if (button) {
        const productToEliminate = button.parentElement
        const productTitle = productToEliminate.querySelector('p').textContent

        cartProducts = cartProducts.filter(p => p.title !== productTitle)
        validateLogin ? localStorage.setItem('existingCart', JSON.stringify(cartProducts)) : sessionStorage.setItem('existingCart', JSON.stringify(cartProducts))
        Toast.fire({icon: "info", title: 'Product removed'})
        addToCart()
    }
})

//funcion que calcula el total para usarlo en varias partes del codigo 

function calculateTotal() {
    let itemsQuantity = 0
    let subTotalPrice = 0

    cartProducts.forEach(product => {
        itemsQuantity += product.quantity
        subTotalPrice += product.quantity * parseFloat(product.price.slice(1))
    })

    return { itemsQuantity, subTotalPrice }
}

//codigo que inserta el elemento en el carrito 

let addToCart = ()=> {

    cartProductsAdded.innerHTML = ''

    let { itemsQuantity, subTotalPrice } = calculateTotal()

    cartProducts.forEach(product =>{

        let addNewProductToTheCart = document.createElement('div')
    
        addNewProductToTheCart.innerHTML = `
        <div class="w-full bg-[--black-500] rounded-3xl relative p-5 father">
            <img src="${product.image}" alt="img" class="w-auto h-[100px] rounded-3xl">
            <div class="flex items-center absolute right-5 top-7 gap-2">
                <button class="outline outline-1 outline-white h-[22px] rounded-3xl px-[.29rem]" id="minusQ">-</button>
                <span class="font-bold text-[--black-50]">${product.quantity}</span>
                <button class="outline outline-1 outline-white h-[22px] rounded-3xl px-[.29rem]" id="plusQ">+</button>
            </div>
            <p class="absolute left-36 top-7 text-[--black-50] productTitle w-[160px]">${product.title}</p>
            <p class="absolute left-36 bottom-8 text-[--black-50]">${product.price}</p>
            <button class="bin-button absolute right-5 bottom-5">
                <svg class="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                    <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" stroke-width="3"></line>
                </svg>
                <svg class="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_8_19" fill="white">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                    </mask>
                    <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)"></path>
                    <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                    <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                </svg>
            </button>
        </div>`

        // Botones para subir o disminur la cantidad de productos en el carrito 
        addNewProductToTheCart.querySelector('#plusQ').addEventListener('click', () => {
            product.quantity++
            updateCart()
        })

        addNewProductToTheCart.querySelector('#minusQ').addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--
                updateCart()
            }
        })
        
        cartProductsAdded.append(addNewProductToTheCart)
    })

    subTotalCart.innerText = `$${subTotalPrice.toFixed(2)}`
    itemsNumber.innerText = `${itemsQuantity}`

    if (itemsQuantity === 0) {
        cartFooter.classList.add('hidden')
        let cartEmpty = document.createElement('div')
        cartEmpty.innerHTML = `<p class="text-center">Your Cart is Empty</p>`
        cartProductsAdded.append(cartEmpty)
        localStorage.removeItem('existingCart')
        sessionStorage.removeItem('existingCart')
    } else {
        cartFooter.classList.remove('hidden')
    }
}

function updateCart() {
    validateLogin ? localStorage.setItem('existingCart', JSON.stringify(cartProducts)) : sessionStorage.setItem('existingCart', JSON.stringify(cartProducts))
    addToCart()
}

// Función para cargar los productos del localStorage al cargar la página

const existingCart = localStorage.getItem('existingCart') || sessionStorage.getItem('existingCart')
if (existingCart) {
    cartProducts = JSON.parse(existingCart)
    addToCart()
}


/*---------------------------------------------------------------*/


/*------------- CHECKOUT PAYPAL API ------------ */


checkoutBtn.addEventListener('click', async()=>{
    toggleVisibility(cartOverlay)

    let { itemsQuantity, subTotalPrice } = calculateTotal()

    if(itemsQuantity === 0){
        await customModal.fire({
            title: 'You can`t check out with the cart empty',
            text: '',
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: `Ok :(`
        })
        return
    }

    toggleVisibility(paymentOverlay)

    document.getElementById('checkOutItems').innerHTML = `${itemsQuantity}`
    document.getElementById('checkOutPrice').innerHTML = `$${(subTotalPrice*1.16).toFixed(2)} mxn`

    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'black',
            shape:  'pill',
            label:  'paypal',
            disableMaxWidth: true
        },
        createOrder: function(data, actions){
            return actions.order.create({
                purchase_units: [{
                    amount:{
                        value: `${(subTotalPrice*1.16).toFixed(2)}`
                    }
                }]
            })
        },
        onApprove: function(data, actions){
            actions.order.capture().then(async function(details){
                await customModal.fire({
                    title: 'Payment Successful !',
                    text: `Authorization ID: ${data.orderID}`,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: `Great!`
                })
                toggleVisibility(paymentOverlay)
                localStorage.removeItem('existingCart')
                sessionStorage.removeItem('existingCart')
                location.reload()
            })
        },
        onCancel:function(data){
            customModal.fire({
                title: 'Payment Canceled',
                text: `Order ID: ${data.orderID}`,
                icon: 'info',
                showCancelButton: false,
            })
        },
        onError: async function(){
            await customModal.fire({
                title: 'Something went wrong',
                text: 'Please try again',
                icon: 'error',
                showCancelButton: false,
            })
            location.reload()
        }
    }).render('#paypalButtons')
})

document.getElementById('checkoutCloseBtn').addEventListener('click', ()=>{
    toggleVisibility(paymentOverlay)
})
