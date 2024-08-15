import {data} from './data.js'

const leftSection = document.querySelector('.section-left')
const rightSection = document.querySelector('.section-right')
let cart = []

document.addEventListener('click', (e)=> {
    if(e.target.dataset.id){
        addToCart(e.target.dataset.id)
        renderCart()
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
    cart.push(targetItem)
}

function getCart(){
    let cartArr = [`<h2 class="cart-title">Your Cart (${cart.length})</h2>`]
    if(cart.length){
        cart.forEach(item => {
            console.log(item)
            cartArr.push(`
                <div class="cart-item-div">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-summary-div">
                        <span class="cart-amount">1x</span> 
                        <span class="cart-item-price">@ $${item.price}</span>
                        <span class="cart-item-total">$6.00</span>
                    </div>
                    <div class="cart-delete-btn"><span class="cart-delete-span">&times;</span></div>
                </div>
                `)
        })
    }else{
        cartArr.push(`<img class="cart-empty-photo" src="./assets/images/illustration-empty-cart.svg">
                      <p class="cart-empty-text"> Your added items will appear here</p>`)
    }

    return cartArr.join('')
}


function renderCart(){
    rightSection.innerHTML = getCart()
}

leftSection.innerHTML += getItems()

renderCart()