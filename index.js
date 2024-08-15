import {data} from './data.js'

const leftSection = document.querySelector('.section-left')
const rightSection = document.querySelector('.section-right')
let cart = []
let totalQuantity = 0
let total = 0

document.addEventListener('click', (e)=> {
    if(e.target.dataset.id){
        addToCart(e.target.dataset.id)
        getTotalQuantity()
        renderCart()
    }
    if(e.target.dataset.itemId){
        deleteFromCart(e.target.dataset.itemId)
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
                    <div class="card-cta-div">
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

function getTotalQuantity(){
    totalQuantity = 0
    cart.forEach(item => totalQuantity += item.quantity)

}

function deleteFromCart(id){
    total = 0
    let newArr = []
    cart.forEach(item =>{
        if(item.id === id){
            item.quantity--
        }

        if(item.quantity > 0){
            newArr.push(item)
        }
    })
    cart.forEach(item => { total += item.quantity * item.price})
    cart = [...newArr]
    getTotalQuantity()
    renderCart()
}

function renderCart(){
    rightSection.innerHTML = getCart()
}

leftSection.innerHTML += getItems()

renderCart()