'use strict'
const subForm       = document.forms['subscription-form'];
let subEmailField   = null;
let subBtn          = null;

if(subForm){

    subEmailField = subForm.elements['subscription-form__email'];
    subBtn        = subForm.elements['subscription-form__submit'];

    if(localStorage.getItem('subscription')){
        subForm.innerHTML =  `
        <h3 class='small-title'> ${(getCookie('lang') === 'ru') ? 'Вы наш подписчик!' : 'You are our subscriber!'}</h3>
        <p class='small-text'>${(getCookie('lang') === 'ru') ? 'Мы будем присылать вам наши новости по электронной почте.' : 'We\`ll send you our news by e-mail.'}</p>
        <input type='email' class='subscription-form__field' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$' placeholder='Email' name='subscription-form__email' id='subscription-form__email'>
        <input class='btn-black rounded-0 border border-2 border-dark' id='unsubscribe' type='submit' value= ${(getCookie('lang') === 'ru') ? 'ОТПИСАТЬСЯ' : 'UNSUBSCRIBE'} name='subscription-form__submit'>`;

        let unsubscribeBtn = document.getElementById('unsubscribe');
        let unsubEmailField = document.getElementById('subscription-form__email');
        unsubscribeBtn.onclick = async () => {
            let data = JSON.stringify({
                email: unsubEmailField.value
            });
            let response = await  fetch('/unsubscribe', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            });
            let result = await response.json();
            localStorage.removeItem('subscription');
        }
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
}

