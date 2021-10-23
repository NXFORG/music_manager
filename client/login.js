let regForm = document.getElementById('registerForm');
let loginForm = document.getElementById('loginForm');
let regSubmit = document.getElementById('submitRegForm');

const loginUser = async (email, pass) => {
    try {
        let response = await fetch(`http://localhost:3000/auth/login`, {
            method: "POST",
            body: JSON.stringify({email: email, pass: pass}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        let jsonResponse = await response.json();
        jsonResponse ? tryLogin(jsonResponse) : alert('Please try again.')
    } catch(err) {
        console.log(err);
    }
}

const regUser = async (fname, lname, email, pass) => {
    try {
        await fetch(`http://localhost:3000/auth/register`, {
            method: "POST",
            body: JSON.stringify({fname: fname, lname: lname, email: email, pass: pass}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        alert('Registration Successful')
        loginUser(email, pass)
    } catch(err) {
        console.log(err);
    }
}

const tryLogin = (data) => {
    const decodedToken = jwt_decode(data.token);
    localStorage.setItem('username', decodedToken.user);
    localStorage.setItem('email', decodedToken.email);
    localStorage.setItem('token', data.token);
    window.location.href = "./browse.html";
}

regForm.addEventListener('submit', e => {
    e.preventDefault();
    let fname = regForm.elements['fname'].value;
    let lname = regForm.elements['lname'].value;
    let email = regForm.elements['email'].value;
    let pass = regForm.elements['pass'].value;
    let passConfirm = regForm.elements['passConfirm'].value;
    if(pass === passConfirm){
        regUser(fname, lname, email, pass);
        regForm.reset();
    } else {
        alert('Please check both password fields match.')
    }
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    let email = loginForm.elements['emailLogin'].value;
    let pass = loginForm.elements['passLogin'].value;
    loginUser(email, pass);
});

const regBtn = document.getElementById('regBtn');
const loginBtn = document.getElementById('loginBtn');
const regTitle = document.getElementById('regTitle');
const loginTitle = document.getElementById('loginTitle');

regBtn.addEventListener('click', e => {
    loginForm.style.display = 'none';
    regForm.style.display = 'block';
    regTitle.style.display = 'block';
    loginTitle.style.display = 'none';
});

loginBtn.addEventListener('click', e => {
    loginForm.style.display = 'block';
    regForm.style.display = 'none';
    loginTitle.style.display = 'block';
    regTitle.style.display = 'none';
});