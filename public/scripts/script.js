'use strict'
const cartIcon     = document.getElementById("cart-icon");
const menuCartIcon = document.getElementById("menu-cart");
const cart         = document.querySelector("#cart");
const menuIcon     = document.querySelector(".menu-icon");
const btnClose     = document.querySelector(".btn-close");
const menu         = document.querySelector(".menu");

cartIcon.addEventListener("mousemove",showCart);
menuIcon.addEventListener("click", showMenu);

function hide(elem){
   elem.style.display = "none";
}
function show(elem){
    elem.style.display = "block";
 }
 function showCart(){
    show(cart);
    cart.classList.add("showAnim");
    cart.onmouseover = () => show(cart);
    cart.onmouseout = () => hide(cart);
}
function showMenu(){
    show(menu);
    menu.classList.add("showAnim");
    menuCartIcon.addEventListener("mousemove",showCart);
    btnClose.onclick = () => hide(menu);
}