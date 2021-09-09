const signupForm = document.forms['signup'];
let firstName = null;
let lastName  = null;
let email     = null;
let password  = null;
let phone     = null;

const signupFormBtn = document.getElementById('signupFormBtn');

if(signupForm){
    firstName = signupForm.elements['first_name'];
    lastName = signupForm.elements['last_name'];
    email = signupForm.elements['email'];
    password = signupForm.elements['password'];
    phone = signupForm.elements['phone'];
}


if(signupFormBtn){
    signupFormBtn.onclick = (e) => {
        e.preventDefault();
        sendData(
            {
                first_name: firstName.value.toLowerCase().trim(),
                last_name: lastName.value.toLowerCase().trim(),
                email : email.value.toLowerCase().trim(),
                password : password.value,
                phone: phone.value
            },
            '/sign_up',
            (result) => {
                if(result !== 'Such a user already exists'){
                    window.location.href = '/categories';
                    setCookie('logged_in', 'true');
                    setCookie('firstName', result.firstName);
                    setCookie('lastName', result.lastName);
                    setCookie('email', result.email);
                    setCookie('phone', result.phone);
                } else {
                    let err = document.createElement('p');
                    err.innerHTML = 'Such a user already exists.';
                    err.style.color = 'red';
                    err.style.textAlign = 'center';
                    signupForm.appendChild(err);
                }
            }
        );
    }
}