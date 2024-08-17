import {data} from './data.js'

const leftSection = document.querySelector('.section-left')
const rightSection = document.querySelector('.section-right')
const modalContainer = document.querySelector('.modal-container'
    
)
let cart = []
let totalQuantity = 0
let total = 0

document.addEventListener('click', (e)=> {
    if(e.target.dataset.id){
        addToCart(e.target.dataset.id)
        getQuantity()
        renderCart()
        getAmountButton(e.target.dataset.id)
    }
    if(e.target.dataset.itemId){
        deleteFromCart(e.target.dataset.itemId)
    }
    if(e.target.className === "cart-btn"){
        document.querySelector('.overlay').classList.remove('hidden')
        renderModal()
    }
    if(!document.querySelector('.overlay').classList.contains('hidden')){
        if(e.target.parentElement === document.body){
        closeModal()
        }
    }
    if(e.target.classList.contains("modal-btn")){
        closeModal()
    }
    if(e.target.classList.contains('minus')){
        updateQuantity('minus', e.target.dataset.btnId)
        getQuantity()
    }
    if(e.target.classList.contains('add')){
        updateQuantity('add', e.target.dataset.btnId)
        getQuantity()
    }
})


function getItems(){
    let htmlArr = []
    data.forEach(item => {
        htmlArr.push(`
                <div class="card">
                <h3 class="card-title">${item.name}</h3>
                <h5 class="card-tag">${item.category}</h5>
                <div class="image-cta-div">
                    <img class="card-img" src="${item.image.desktop}" />
                    <div class="card-cta-div" data-btn-id=${item.id}>
                    <div class="card-cta-btn" data-id=${item.id}>
                        <i class="fa-solid fa-cart-plus" data-id=${item.id}></i>
                        <h2 class="card-cta-title" data-id=${item.id}>Add to Cart</h2>
                    </div>
                    </div>
                </div>
                <span class="card-price">$${item.price.toFixed(2)}</span>
                </div>           
            `)
    })
    return htmlArr.join('')
}

function addToCart(id){
    const targetItem = data.filter(item => {
        return item.id === id
    })[0]
    total += targetItem.price
    targetItem.quantity++
    if(!cart.includes(targetItem)){
        cart.push(targetItem)
    }
}

function getCart(){
    let cartArr = [`<h2 class="cart-title">Your Cart (${totalQuantity})</h2>`]
    if(cart.length){
        cart.forEach(item => {
            cartArr.push(`
                <div class="cart-item-div">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-summary-div">
                        <span class="cart-amount">${item.quantity}x</span> 
                        <span class="cart-item-price">@ $${item.price.toFixed(2)}</span>
                        <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="cart-delete-btn" data-item-id=${item.id}><span class="cart-delete-span" data-item-id=${item.id}>&times;</span></div>
                </div>
                `)
        })
        cartArr.push(`
                <div class="cart-total-div">
                    <h5 class="cart-total-title">Order Total</h5>
                    <h3 class="cart-total">$${total.toFixed(2)}</h3>
                    </div>
                    <div class="disclaimer">
                    <p><i class="fa-solid fa-tree"></i>This is a <span class="bold">carbon neutral</span> delivery.</p>
                    </div>
                    <a class="cart-btn" href="#">Confirm Order</a>
   
            `)
    }else{
        cartArr.push(`<img class="cart-empty-photo" src="./assets/images/illustration-empty-cart.svg">
                      <p class="cart-empty-text"> Your added items will appear here</p>`)
    }

    return cartArr.join('')
}

function getQuantity(){
    totalQuantity = 0
    cart.forEach(item => totalQuantity += item.quantity)
    return getQuantity
}

function getTotalPrice(){
    total = 0
    cart.forEach(item => total += item.quantity * item.price)
    return total
}

function deleteFromCart(id){
    // total = 0
    let newArr = []
    cart.forEach(item =>{
        if(item.id === id){
            item.quantity--
        }

        if(item.quantity > 0){
            newArr.push(item)
        }
    })
    // cart.forEach(item => { total += item.quantity * item.price})
    cart = [...newArr]
    total = getTotalPrice()
    renderCart()
}


function getModalItems(){
    const htmlHolder = []
    cart.forEach(item => {
        htmlHolder.push(`
                        <div class="modal-item-div">
                            <div class="modal-item-content">
                                <img  class="modal-item-img" src="${item.image.thumbnail}">
                                <div class="modal-item-details">
                                <h5 class="modal-item-title">${item.name}</h5>
                                <span class="modal-item-amount">${item.quantity}x</span> 
                                <span class="modal-item-price">@ $${item.price.toFixed(2)}</span>
                                </div>
                                <span class="modal-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
            `)
    })
    document.querySelector('.modal-total-title').innerText = `$${total.toFixed(2)}`
    return htmlHolder.join('')
}

function getAmountButton(id){
    const arr = document.querySelectorAll('.card-cta-div')
    let quantity = 0
    cart.forEach(item => {
            if(item.id === id){
                quantity = item.quantity
            }

    })
    arr.forEach(item => {
        if(item.dataset.btnId === id){
            item.innerHTML = `<div class="card-cta-btn active-btn">
            <div class="item-amount-container"><p class="item-amount-btn dash minus" data-btn-id=${id}>&mdash;</p></div>
            <h2 class="card-cta-title">${quantity}</h2>
            <div class="item-amount-container"><p class="item-amount-btn add" data-btn-id=${id}>+</p></div>
          </div>`
        }
    })

}

function updateQuantity(operation, id){
   cart.forEach(item =>{
    if(item.id == id){
        if(operation === "minus"){
            item.quantity--
        }else{
            item.quantity++
        }
    }
   })
   getAmountButton(id)
   total = getTotalPrice()
   getQuantity()
   renderCart()
}

function closeModal(){
    document.querySelector('.overlay').classList.add('hidden')
    clearModal()
}

function renderCart(){
    rightSection.innerHTML = getCart()
}

function renderModal(){
    modalContainer.innerHTML += getModalItems()
}

function clearModal(){
    modalContainer.innerHTML = ''
}

leftSection.innerHTML += getItems()

renderCart()