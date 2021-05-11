'use strict'

const input        = document.querySelector(".search-form__input");
const searchIcon   = document.querySelector(".search-form__icon");
const cartIcon     = document.getElementById("cart");
const menuCartIcon = document.getElementById("menu-cart");
const cartContent  = document.querySelector(".cart-content");
const menuIcon     = document.querySelector(".menu-icon");
const btnClose     = document.querySelector(".btn-close");
const menu         = document.querySelector(".menu");


input.addEventListener("focus",hide);
input.addEventListener("blur",show);
cartIcon.addEventListener("mousemove",showCartContent);
menuIcon.addEventListener("click", showMenu);

function hide(){
   searchIcon.style.display = "none";
}
function show(){
    searchIcon.style.display = "block";
}
function showCartContent(){
    cartContent.style.display = "block";
    cartContent.classList.add("showAnim");
    cartContent.onmouseover = () => cartContent.style.display = "block";
    cartContent.onmouseout = () => cartContent.style.display = "none";
}
function showMenu(){
    menu.style.display = "block";
    menu.classList.add("showAnim");
    menuCartIcon.addEventListener("mousemove",showCartContent);
    btnClose.onclick = () => menu.style.display = "none";
}
