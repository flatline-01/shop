const loginForm = document.forms['login'];
let logInEmail    = null;
let logInPassword = null;
const loginFormBtn = document.getElementById('loginFormBtn');

if(getCookie('logged_in')){
    let container = document.getElementById('login-form-container');
    let start_tag = '<h3 class="smaller-title" style="text-align: center; color: white;">'
    container.innerHTML = (getCookie('lang') === 'ru') ? `${start_tag}Вы вошли аккаунт.</h3>` : 
        `${start_tag}You have logged in to your account.</h3>`;
}

if(loginForm){
    logInEmail = loginForm.elements['email'];
    logInPassword = loginForm.elements['password'];
}

if(loginFormBtn){
    loginFormBtn.onclick = (e) => {
        e.preventDefault();
        sendData(
            {
                email : logInEmail.value.toLowerCase().trim(),
                password : logInPassword.value
            },
            '/log_in',
            (result) => {
                if(typeof  result === 'object') {
                    window.location.href = '/categories';
                    setCookie('logged_in', 'true');
                    setCookie('firstName', result.firstName);
                    setCookie('lastName', result.lastName);
                    setCookie('email', result.email);
                    setCookie('phone', result.phone);
                }
                if (result === 404){
                    let err = document.createElement('p');
                    err.innerHTML = 'Wrong email or password.';
                    err.style.color = 'red';
                    err.style.textAlign = 'center';
                    loginForm.appendChild(err);
                }
            }
        );
    }
}