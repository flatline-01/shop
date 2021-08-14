const signupForm = document.forms['signup'];
let firstName;
let lastName;
let email;
let password;
const signupFormBtn = document.getElementById('signupFormBtn');
if(signupForm){
    firstName = signupForm.elements['first_name'];
    lastName = signupForm.elements['last_name'];
    email = signupForm.elements['email'];
    password = signupForm.elements['password'];
}


if(signupFormBtn){
    signupFormBtn.onclick = (e) => {
        e.preventDefault();
        sendData(
            {
                first_name: firstName.value.toLowerCase().trim(),
                last_name: lastName.value.toLowerCase().trim(),
                email : email.value.toLowerCase().trim(),
                password : password.value
            },
            '/sign_up',
            (result) => {
                if(result === 200){
                    signupForm.parentNode.parentNode.innerHTML = `<p class='title text-center' style='color: #198754;'>Done</p>`;
                    sessionStorage.setItem('logged_in', 'true');
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