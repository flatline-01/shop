'use strict'
let cartData = {}

const addToCartBtn = document.getElementById('addToCartBtn');
const cart2 = document.getElementById('cart2');

if(localStorage.getItem('cart')){
    cartData = JSON.parse(localStorage.getItem('cart'));
    getProductInfo();
}

if(addToCartBtn !== null){
    addToCartBtn.onclick = addToCart;
}

async function addToCart(){
    let productId = this.dataset.productId;
    if(cartData[productId]) cartData[productId]++;
    else cartData[productId] = 1;
    getProductInfo();
}

async function  getProductInfo(){
    updateLocalStorage();
    let data = JSON.stringify({key: Object.keys((cartData))});
    let response = await fetch('/cart', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
    let result = await response.json();
    
    if(result.length !== 0){
        createSecondCartElem(result);
        createFirstCartElem(result);

    }
    else output('Cart is empty');
}

function createFirstCartElem(serverAnswer){
    let [goodsCount, sum, sumOfPrices] = createCartElem(serverAnswer);

    let btn = `<a class='rounded-0 menu__btn' href='/order'>ЗАКАЗАТЬ</a>`
    let cartContent = '';
    for(let i in serverAnswer){
        let cartElemImg = `<div class='col-5'><img src=${serverAnswer[i]['image']} alt='bike' class='w-100'></div>`;
        let cartElemText = `<p class='col-4 text'>${serverAnswer[i]['name']}<sup class='goods-count'>${cartData[serverAnswer[i]['id']]}</sup><br>${serverAnswer[i]['cost']}₴</p><hr>`;
        cartContent += `<div class='row d-flex justify-content-center align-items-center px-3'>${cartElemImg}${cartElemText}</div></div>`;
    }
    chengeElemText(cart, `${goodsCount}${cartContent}${sum}${btn}`);
}
function createSecondCartElem(serverAnswer){

    let [goodsCount, sum, sumOfPrices] = createCartElem(serverAnswer);

    let cartContent2 = '';
    for(let i in serverAnswer){
        let cartElemImg = `<div class='col-3 pb-2'><img src=${serverAnswer[i]['image']} alt='bike' class='w-100'></div>`;
        let cartElemText = `<p class='col-3 text pb-2'><b>${serverAnswer[i]['name']}</b><br> Рама: ${serverAnswer[i]['frame']}</p>`;
        let btns = `<div class='col-3 text pb-2'> <span class='minus-btn'>-</span> <span class='bg-black py-1 px-2 text-white'>${cartData[serverAnswer[i]['id']]}</span> <span class='plus-btn'>+</span></div>`
        let cartElemPrice = `<div class='col-3 pb-2'><p class="text">${serverAnswer[i]['cost']}₴</p></div>`
        cartContent2 += `<div class='row d-flex justify-content-center align-items-center' data-product-id='${serverAnswer[i]['id']}'>${cartElemImg}${cartElemText}${btns}${cartElemPrice}<hr></div>`;
    }

    chengeElemText(cart2, `${goodsCount}${cartContent2}${sum}`);
    initializeCartListeners();
}

function updateLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cartData));
}
function getCount(obj){
    return Object.keys(obj).reduce((sum,key) => sum+parseFloat(obj[key]),0);
}
function initializeOnProductAddListener(){
    const plus = document.getElementsByClassName('plus-btn');
    Array.from(plus).forEach(function(el){
        let parent = el.parentElement.parentElement;
        el.onclick = () => {
            addToCart.call(parent);
        }
    });
}
function initializeOnProductDeleteListener() {
    const minus = document.getElementsByClassName('minus-btn');
    Array.from(minus).forEach(function (el) {
        let parent = el.parentElement.parentElement;
        el.onclick = () => {
            if(+cartData[parent.dataset.productId] - 1 > 0){
                cartData[parent.dataset.productId]--;
            }
            else{
                delete  cartData[parent.dataset.productId];
            }
            getProductInfo();
        }
    });
}
function initializeCartListeners(){
    initializeOnProductAddListener();
    initializeOnProductDeleteListener();
}
function output(str){
    chengeElemText(cart2, str);
    cartIcon.setAttribute('title', str);
    menuCartIcon.setAttribute('title', str);
}
function chengeElemText(elem, data){
    if(elem !== null) elem.innerHTML = data;
}

function createCartElem(serverAnswer){
    let goodsCount = `<h3 class='smaller-title mb-3 sum-goods-count'><b>В корзине ${getCount(cartData)} товаров</b></h3>`;
    let sum = `<p class='sum-goods-prices'>`;
    let prices = [];
    for(let i = 0; i < serverAnswer.length; i++){
        prices.push(serverAnswer[i].cost * cartData[serverAnswer[i].id]);
    }
    let sumOfPrices = prices.reduce((sum, cur) => sum + cur);
    sum+=`Доставка: бесплатно <br> <b>Итого:</b> ${sumOfPrices} ₴</p>`;

    return [goodsCount, sum, sumOfPrices];
}
