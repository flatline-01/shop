'use strict'
const form         = document.forms['form'];
let firstNameField = null;
let lastNameField  = null;
let phoneField     = null;
let emailField     = null;
let paymentField   = null;
let cityField      = null;
let deliveryField  = null;
let addressField   = null;

if(sessionStorage.getItem('logged_in')){
    form.firstChild.remove();
}

if(form){
    firstNameField = form.elements['firstname'] || null;
    lastNameField  = form.elements['lastname'] || null;
    phoneField     = form.elements['phone'] || null;
    emailField     = form.elements['email'] || null;
    paymentField   = form.elements['payment'];
    cityField      = form.elements['city'];
    deliveryField  = form.elements['delivery'];
    addressField   = form.elements['address'];
}

const orderBtn = document.getElementById('orderBtn');

if(orderBtn){
    orderBtn.onclick = (e) => {
        e.preventDefault();
        sendData(
            {
                firstName: firstNameField ? firstNameField.value : JSON.parse(sessionStorage.getItem('data')).firstName,
                lastName:  lastNameField ? lastNameField.value : JSON.parse(sessionStorage.getItem('data')).lastName,
                phone: phoneField ? phoneField.value : JSON.parse(sessionStorage.getItem('data')).phone,
                email: emailField ? emailField.value :  JSON.parse(sessionStorage.getItem('data')).email,
                city: cityField.value,
                address: addressField.value,
                payment: paymentField.value,
                delivery: deliveryField.value,
                cart: JSON.stringify(cartData)
            },
            '/order',
            (result) => {
                if(result){
                    localStorage.setItem('cart', JSON.stringify({}));
                    window.location.reload();
                }
            }
        )
    };
}

let a = JSON.parse(sessionStorage.getItem('data'));
