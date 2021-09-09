'use strict'
const cartIcon     = document.getElementById('cart-icon');
const menuCartIcon = document.getElementById('menu-cart');
const cart         = document.querySelector('#cart');
const menuIcon     = document.querySelector('.menu-icon');
const btnClose     = document.querySelector('.btn-close');
const menu         = document.querySelector('.menu');
const dates        = document.getElementsByClassName('date');
const newsCardText = document.getElementsByClassName('news-card__text')

const months = {
  'Jan': 'Янв',
  'Feb': 'Фев',
  'Mar': 'Мар',
  'Apr': 'Апр',
  'May': 'Май',
  'Jun': 'Июнь',
  'Jul': 'Июль',
  'Aug': 'Авг',
  'Sep': 'Сен',
  'Oct': 'Окт',
  'Nov' : 'Ноя', 
  'Dec' :'Дек'
}

checkUndefined(newsCardText, () => {
    for(let item of [...newsCardText]){
        item.innerHTML = item.innerHTML.slice(0, 200) + '...';
    }
});

checkUndefined(dates, () => {
    for(let item of [...dates]){
        item.innerHTML = dateParse(item.innerHTML);
    }
});

function checkUndefined(elem, calback){
    if(elem){
        calback();
    }
    else {
        throw new Error(`${elem} is undefined`);
    }
}

cartIcon.addEventListener('mousemove',showCart);
menuIcon.addEventListener('click', showMenu);

function hide(elem){
   elem.style.display = 'none';
}
function show(elem){
    elem.style.display = 'block';
 }
 function showCart(){
    show(cart);
    cart.classList.add('showAnim');
    cart.onmouseover = () => show(cart);
    cart.onmouseout = () => hide(cart);
}
function showMenu(){
    show(menu);
    menu.classList.add('showAnim');
    menuCartIcon.addEventListener('mousemove',showCart);
    btnClose.onclick = () => hide(menu);
}

function dateParse(gmtFormat){
    const gmtElems = gmtFormat.split(' ');
    if(getCookie('lang') === 'ru'){
      gmtElems[1] = months[gmtElems[1]];
    }
    return `${gmtElems[1]} ${gmtElems[2]} ${gmtElems[3]}`;
}

function sendData(data, url, callback){
    fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(result => callback(result));
}

function createGroups(arr, numGroups) {
    let perGroup;
    if(numGroups === 3){
        perGroup = Math.ceil(arr.length / numGroups) + 1;
    } else {
        perGroup = Math.ceil(arr.length / numGroups);
    }
    return new Array(numGroups)
        .fill('')
        .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
}

function setCookie(name, value, options = {}) {
    options = {
      path: '/',
      secure: true
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  });
}