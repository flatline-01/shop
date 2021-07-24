'use strict'
const subForm       = document.forms['subscription-form'];
const subEmailField = subForm.elements['subscription-form__email'];
const subBtn        = subForm.elements['subscription-form__submit'];

if(localStorage.getItem('subscription')){
    subForm.parentNode.innerHTML =  `
        <h3 class='smaller-title'>You are our subscriber!</h3>
        <p class='small-text'>We\`ll send you our news by e-mail.</p>
        <a class='btn-black rounded-0 border border-2 border-dark'> unsubscribe ?</a>
    `;
}
subBtn.onclick = sendSubscriptionData;

async function sendSubscriptionData(){
    let data = JSON.stringify({
        email: subEmailField.value
    });
    let response = await  fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
    let result = await response.json();
    localStorage.setItem('subscription', true);
}
