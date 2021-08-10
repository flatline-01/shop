'use strict'
let cartData = {}

const addToCartBtn = document.getElementById('addToCartBtn');

const orderProductBtn = document.getElementById('orderProduct');

const cartOnOrderPage = document.getElementById('cartOnOrderPage');

if(localStorage.getItem('cart')){
    cartData = JSON.parse(localStorage.getItem('cart'));
    getProductInfo();
}

if(addToCartBtn !== null){
    addToCartBtn.onclick = addToCart;
}
if(orderProductBtn !== null){
    orderProductBtn.onclick = addToCart;
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
    else output('The cart is empty');
}

function createFirstCartElem(serverAnswer){
    let [goodsCount, sum, sumOfPrices] = createCartElem(serverAnswer);

    let btn = `<a class='rounded-0 menu__btn' href='/cart'>ORDER</a>`
    let cartContent = '';
    for(let i in serverAnswer){
        let cartElemImg = `<div class='col-4 p-2'><img src=/images/bikes/${serverAnswer[i]['images'][0].images.split(', ')[0]} alt='bike' class='w-100'></div>`;
        let cartElemText = `<p class='col-5 small-text'>${serverAnswer[i]['name'].toUpperCase()}<br>${serverAnswer[i]['cost']}₴</p><span class='col-2'>Count: <b class='goods-count'>${cartData[serverAnswer[i]['id']]}</b></span><hr>`;
        cartContent += `<div class='row d-flex justify-content-center align-items-center px-3'>${cartElemImg}${cartElemText}</div></div>`;
    }
    chengeElemText(cart, `${goodsCount}${cartContent}${sum}${btn}`);
}
function createSecondCartElem(serverAnswer){

    let [goodsCount, sum, sumOfPrices] = createCartElem(serverAnswer);

    let cartContentOnOrderPage = '';
    for(let i in serverAnswer){
        let cartElemImg = `<div class='col-3 pb-2'><img src=/images/bikes/${serverAnswer[i]['images'][0].images.split(', ')[0]} alt='bike' class='w-100'></div>`;
        let cartElemText = `<p class='col-3 pb-2'><b class='small-text'>${serverAnswer[i]['name'].toUpperCase()}</b><br> The frame: ${serverAnswer[i]['frame']}</p>`;
        let btns = `<div class='col-3 text pb-2'> <span class='minus-btn pointer'>-</span> <span class='bg-black py-1 px-2 text-white'>${cartData[serverAnswer[i]['id']]}</span> <span class='plus-btn pointer'>+</span></div>`
        let cartElemPrice = `<div class='col-3 pb-2'><p class='text'>${serverAnswer[i]['cost']}₴</p></div>`
        cartContentOnOrderPage += `<div class='row d-flex justify-content-center align-items-center' data-product-id='${serverAnswer[i]['id']}'>${cartElemImg}${cartElemText}${btns}${cartElemPrice}<hr></div>`;
    }

    chengeElemText(cartOnOrderPage, `${goodsCount}${cartContentOnOrderPage}${sum}`);
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
    chengeElemText(cartOnOrderPage, str);
    cartIcon.setAttribute('title', str);
    menuCartIcon.setAttribute('title', str);
}
function chengeElemText(elem, data){
    if(elem !== null) elem.innerHTML = data;
}

function createCartElem(serverAnswer){
    let goodsCount;
    if(getCount(cartData) === 1){
        goodsCount = `<h3 class='smaller-title mx-2 mt-2 mb-4 sum-goods-count'><b>There is  ${getCount(cartData)} product in the cart</b></h3>`;
    }
    else {
        goodsCount = `<h3 class='smaller-title mb-3 sum-goods-count'><b>There are ${getCount(cartData)} products in the cart</b></h3>`;
    }
    let sum = `<p class='sum-goods-prices'>`;
    let prices = [];
    for(let i = 0; i < serverAnswer.length; i++){
        prices.push(serverAnswer[i].cost * cartData[serverAnswer[i].id]);
    }
    let sumOfPrices = prices.reduce((sum, cur) => sum + cur);
    sum+=`Delivery: free <br> <b>Total:</b> ${sumOfPrices} ₴</p>`;

    return [goodsCount, sum, sumOfPrices];
}
