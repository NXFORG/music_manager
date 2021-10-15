let regForm = document.getElementById('registerForm');
let loginForm = document.getElementById('loginForm');
let regSubmit = document.getElementById('submitRegForm');

const regUser = async (fname, lname, email, pass) => {
    try {
        await fetch(`http://localhost:3000/auth/register`, {
            method: "POST",
            body: JSON.stringify({fname: fname, lname: lname, email: email, pass: pass}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        window.location.href = "./hello.html"
    } catch(err) {
        console.log(err);
    }
}

const loginUser = async (email, pass) => {
    try {
        let response = await fetch(`http://localhost:3000/auth/login`, {
            method: "POST",
            body: JSON.stringify({email: email, pass: pass}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        jsonResponse.success ? window.location.href = "hello.html" : alert('Please try again.')
    } catch(err) {
        console.log(err);
    }
}

regForm.addEventListener('submit', e => {
    e.preventDefault();
    let fname = regForm.elements['fname'].value;
    let lname = regForm.elements['lname'].value;
    let email = regForm.elements['email'].value;
    let pass = regForm.elements['pass'].value;
    let passConfirm = regForm.elements['passConfirm'].value;
    pass === passConfirm ? regUser(fname, lname, email, pass) : alert('Please check your both password fields match.')
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    let email = loginForm.elements['emailLogin'].value;
    let pass = loginForm.elements['passLogin'].value;
    loginUser(email, pass);
});