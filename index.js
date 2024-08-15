import {data} from './data.js'

const leftSection = document.querySelector('.section-left')




function render(){
    let htmlArr = []
    data.forEach(item => {
        htmlArr.push(`
                <div class="card">
                <h3 class="card-title">${item.name}</h3>
                <h5 class="card-tag">${item.category}</h5>
                <div class="image-cta-div">
                    <img class="card-img" src="${item.image.desktop}" />
                    <div class="card-cta-div">
                    <div class="card-cta-btn">
                        <i class="fa-solid fa-cart-plus"></i>
                        <h2 class="card-cta-title">Add to Cart</h2>
                    </div>
                    </div>
                </div>
                <span class="card-price">${item.price}</span>
                </div>           
            `)
    })
    console.log(htmlArr)
    return htmlArr.join('')
}


leftSection.innerHTML += render()