const loginForm = document.forms['login'];
let logInEmail    = null;
let logInPassword = null;
const loginFormBtn = document.getElementById('loginFormBtn');
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
                    sessionStorage.setItem('logged_in', 'true');
                    sessionStorage.setItem('data',  JSON.stringify({
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        phone: result.phone
                    }));
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