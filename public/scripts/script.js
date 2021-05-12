'use strict'

const cartIcon     = document.getElementById("cart");
const menuCartIcon = document.getElementById("menu-cart");
const cartContent  = document.querySelector(".cart-content");
const menuIcon     = document.querySelector(".menu-icon");
const btnClose     = document.querySelector(".btn-close");
const menu         = document.querySelector(".menu");

cartIcon.addEventListener("mousemove",showCartContent);
menuIcon.addEventListener("click", showMenu);

function hide(elem){
   elem.style.display = "none";
}
function show(elem){
    elem.style.display = "block";
 }
 function showCartContent(){
    show(cartContent);
    cartContent.classList.add("showAnim");
    cartContent.onmouseover = () => show(cartContent);
    cartContent.onmouseout = () => hide(cartContent);
}
function showMenu(){
    show(menu);
    menu.classList.add("showAnim");
    menuCartIcon.addEventListener("mousemove",showCartContent);
    btnClose.onclick = () => hide(menu);
}