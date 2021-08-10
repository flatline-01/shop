'use strict'
const form         = document.forms['form'];
let firstNameField = form;
let lastNameField  = null;
let phoneField     = null;
let emailField     = null;
let paymentField   = null;
let cityField      = null;
let deliveryField  = null;
let addressField   = null;

if(form){
    firstNameField = form.elements['firstname'];
    lastNameField  = form.elements['lastname'];
    phoneField     = form.elements['phone'];
    emailField     = form.elements['email'];
    paymentField   = form.elements['payment'];
    cityField      = form.elements['city'];
    deliveryField  = form.elements['delivery'];
    addressField   = form.elements['address'];
}

const orderBtn = document.getElementById('orderBtn');

if(orderBtn){
    orderBtn.onclick = sendData;
}

function checkFields(){
    if(firstNameField.value !== '' && lastNameField.value !== '' && phoneField.value !== '' && emailField.value !== '' && phoneField.value !== '' && cityField.value !== '' && deliveryField.value !== '' && addressField.value !== ''){
        return true;
    }
}

async  function sendData(){
    if(checkFields()){
        let data = JSON.stringify({
            firstName: firstNameField.value,
            lastName: lastNameField.value,
            phone: phoneField.value,
            email: emailField.value,
            city: cityField.value,
            address: addressField.value,
            payment: paymentField.value,
            delivery: deliveryField.value,
            cart: JSON.stringify(cartData)
        });
        let response = await  fetch('/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        });
        let result = await response.json();
        localStorage.setItem('cart', JSON.stringify({}));
    }
}
