'use strict'
const form           = document.forms['form'];
const firstNameField = form.elements['firstname'];
const lastNameField  = form.elements['lastname'];
const phoneField     = form.elements['phone'];
const emailField     = form.elements['email'];
const paymentField   = form.elements['payment'];
const cityField      = form.elements['city'];
const deliveryField  = form.elements['delivery'];
const addressField   = form.elements['address'];

const orderBtn = document.getElementById('orderBtn');

orderBtn.onclick = sendData;

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
