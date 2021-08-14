const loginForm = document.forms['login'];
let logInEmail;
let logInPassword;
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
                if(result === 200) {
                    loginForm.parentNode.innerHTML = `<p class='title text-center' style='color: #198754'>Welcome</p>`;
                    sessionStorage.setItem('logged_in', 'true');
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