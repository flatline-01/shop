const input        = document.querySelector(".search-form__input");
const searchIcon   = document.querySelector(".search-form__icon");
const cartIcon     = document.getElementById("cart");
const menuCartIcon = document.getElementById("menu-cart");
const cartContent  = document.querySelector(".cart-content");
const menuIcon     = document.querySelector(".menu-icon");
const btnClose     = document.querySelector(".btn-close");
const menu         = document.querySelector(".menu");

/*
input.onfocus = hide(searchIcon);
input.onblur  = show(searchIcon);
*/
input.addEventListener("focus",hide);
input.addEventListener("blur",show);
cartIcon.addEventListener("mousemove",showCartContent);
menuIcon.addEventListener("click", showMenu);

function hide(){
    //elem.style.display = "none";
    searchIcon.style.display = "none";
}
function show(){
    //elem.style.display = "block";
    searchIcon.style.display = "block";
}
function showCartContent(){
    cartContent.style.display = "block";
    cartContent.classList.add("showAnim");
   // cartContent.onmouseover = () =>  show(cartContent);
   // cartContent.onmouseout = () =>  hide(cartContent);
    cartContent.onmouseover = () => cartContent.style.display = "block";
    cartContent.onmouseout = () => cartContent.style.display = "none";
}
function showMenu(){
    menu.style.display = "block";
    menu.classList.add("showAnim");
    menuCartIcon.addEventListener("mousemove",showCartContent);
    //btnClose.onclick = () =>  hide(menu);
    btnClose.onclick = () => menu.style.display = "none";
}

/*
each value, index in goods
   p #{value["name"]}
*/