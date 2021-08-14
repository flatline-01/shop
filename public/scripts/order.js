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
    orderBtn.onclick = (e) => {
        e.preventDefault();
        sendData(
            {
                firstName: firstNameField.value,
                lastName: lastNameField.value,
                phone: phoneField.value,
                email: emailField.value,
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

