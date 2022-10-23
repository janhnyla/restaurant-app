import {menuArray} from './data.js'

let theOrderArray = []
const yourOrder = document.getElementById('your-order')
const yourCard = document.getElementById('your-card')
const ratingStars = [...document.getElementsByClassName("rating__star")];

document.addEventListener('click', function(e){
        if(e.target.dataset.order){    
            getOrder(e.target.dataset.order)          
        }
        else if(e.target.dataset.remove){
            removeOrder(e.target.dataset.remove)
        }
        else if(e.target.dataset.complete){
            completeOrder(e.target.dataset.complete)
        }else if(e.target.dataset.close){
            yourCard.style.display = 'none'
        }else if(e.target.dataset.pay){
            paymentAccepted()
        }else if(e.target.dataset.rating){
            ratingReceived(e.target.dataset.rating)
        }
})

function getOrder(itemId){
        const orderObj = menuArray.filter(function(menuItem){
        return menuItem.id === parseInt(itemId)
        })[0]
        theOrderArray.push(orderObj)
        showOrder()
        return theOrderArray 
}

function showOrder(){
    yourOrder.innerHTML =''
    let i = 0
    yourOrder.style.display = 'block'
    yourOrder.innerHTML =`<h1>Your Order</h1>
    <p id="discount">Get 10% discount when you order both a meal and a drink!</p>`
    theOrderArray.forEach(function(orderItem){
    yourOrder.innerHTML +=`<div id="order-item-name">${orderItem.name} <button class="remove-item"  data-remove="${i}">remove</button></div>
    <div id="order-item-prize">$${orderItem.price}</div>`
    i++
        }
    )
    getSum()
    return yourOrder    
}

function removeOrder(removeId){
    theOrderArray.splice(removeId, 1)
    showOrder()
    if(theOrderArray.length === 0){
    yourOrder.style.display = 'none'
  }
}

function getSum(){
    const count = theOrderArray.filter(item => item.type === 'Drink').length
    const sum = theOrderArray.reduce((accumulator, object) => {
    return accumulator + object.price;
    }, 0)
    const discount = sum / 10
    const totalSum = sum - discount
if (count === 0){

        yourOrder.innerHTML +=`<hr>
        <div id="order-item-name">Discount:</div>
        <div id="order-item-prize">$0</div>
        <div id="order-item-name">Total Price:</div>
        <div id="order-item-prize">$${sum}</div>
        <div><button class="complete-order" data-complete="1">Complete Order</button</div>`
}else if (count < theOrderArray.length){
        yourOrder.innerHTML +=`<hr>
        <div id="order-item-name">Discount:</div>
        <div id="order-item-prize">$${discount}</div>
        <div id="order-item-name">Total Price:</div>
        <div id="order-item-prize">$${totalSum}</div>
        <div><button class="complete-order" data-complete="1">Complete Order</button</div>`
}else{
        yourOrder.innerHTML +=`<hr>
        <div id="order-item-name">Discount:</div>
        <div id="order-item-prize">$0</div>
        <div id="order-item-name">Total Price:</div>
        <div id="order-item-prize">$${sum}</div>
        <div><button class="complete-order" data-complete="1">Complete Order</button</div>`
}
}


function completeOrder(){
    yourCard.style.display = 'block'
    yourCard.innerHTML = `
    <div id="close-payment-container">
    <button class="close-payment-btn" id="close-payment-btn" data-close="2">X</button>
    </div>
    <h2>Enter Card Details</h2>

    <div id="card-form-container">
    <form id="card-form">
    <input type="text" id="full-name" name="fullName" placeholder="Enter your name" required/>
    <input type="tel" id="credit-number" name="credit-number" class="cc-number" minlength="16" maxlength="16" placeholder="Enter card number" required/>
    <input type="tel" id="credit-expires" name="credit-expires" class="cc-expires" minlength="5" maxlength="5" placeholder="MM / YY" required/>
    <input type="numbers" id="cvc" name="CVC" class="cc-cvc" minlength="3" maxlength="3" placeholder="CVC" required/>
    <button type="button" id="submit" class="card-submit" data-pay="3">Pay</button>
    </div>
    </form>`
}

function paymentAccepted(){
    const inpObj = document.getElementById('card-form')
    if(!inpObj.checkValidity()){
       inpObj.reportValidity()
    }else {
        yourCard.style.display = 'none'
        yourOrder.innerHTML = `
        <div id="thank-you">
        <p id="t-you">Thank you for your order. We have received the money, and your order is on its way</p>
        <p id="t-you">Please rate your order experience to help us grow better!</p>
        `
    theOrderArray = []
    document.getElementById('rating').style.display = 'block'
    }
}

function executeRating(stars) {
    const starClassActive = "rating__star fas fa-star";
    const starClassInactive = "rating__star far fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((star) => {
      star.onclick = () => {
        i = stars.indexOf(star);
  
        if (star.className===starClassInactive) {
          for (i; i >= 0; --i) stars[i].className = starClassActive;
        } else {
          for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
        }
      };
    });
}

executeRating(ratingStars);

function ratingReceived(rating){
    yourOrder.innerHTML = ''
    document.getElementById('rating').innerHTML = `<p id="t-you">Thank you for your rating of ${rating} stars</p>`
}

function getMenu(){
    let menu =''
    menuArray.forEach(function(menuItem){

        let itemIngrediens = ''

                menuItem.ingredients.forEach(function(item){
                itemIngrediens+=item +", "
   
            }
            )

        const itemIngredienser = itemIngrediens.replace(/,\s*$/, "");              
     

        menu +=`
        <div id="grid-item"><span class="emoji">${menuItem.emoji}</span></div>
        <div id="grid-item" class="menu-item">${menuItem.name}
        <p class="menu-ingrediens">${itemIngredienser}</p>
        <p class="menu-prizes">$${menuItem.price}</p>
        </div>
        <div id="grid-item"><button class="add-item" data-order="${menuItem.id}">+</button></div>
        `
    })
return menu 

}

function render(){
    document.getElementById('menu-items').innerHTML = getMenu()
}

render()
