const navbar = document.getElementById('navLinks');

if(localStorage.getItem('username')){
    let navLink = document.createElement('li');
    let linkAnchor = document.createElement('a');
    linkAnchor.setAttribute('href', './browse.html');
    linkAnchor.textContent = 'Manage';
    navLink.setAttribute('class', 'navLink');
    navLink.insertAdjacentElement('afterbegin', linkAnchor);
    navbar.insertAdjacentElement('beforeend', navLink);
    navbar.removeChild(navbar.children[2])
}