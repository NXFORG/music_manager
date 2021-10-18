const navbar = document.getElementById('navLinks');

const addTab = (link, title) => {
    let navLink = document.createElement('li');
    let linkAnchor = document.createElement('a');
    linkAnchor.setAttribute('href', link);
    linkAnchor.textContent = title;
    navLink.setAttribute('class', 'navLink');
    navLink.insertAdjacentElement('afterbegin', linkAnchor);
    navbar.insertAdjacentElement('beforeend', navLink);
    title === 'Sign-out' && navLink.setAttribute('id', 'signOut');
    title === localStorage.getItem('username') && navLink.setAttribute('id', 'user');
}

const loginLink = document.getElementById('loginLink');

if(localStorage.getItem('username')){
    addTab('./browse.html', 'Manage');
    addTab('./index.html', 'Sign-out');
    addTab('', localStorage.getItem('username'));
    loginLink && navbar.removeChild(loginLink);
}

const exit = document.getElementById('signOut');

exit.addEventListener('click', e => {
    localStorage.removeItem('username');
    location.href = "./index.html";
});