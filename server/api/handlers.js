const form = document.getElementById('findArtist');
const add = document.getElementById('addButton');


form.addEventListener('submit', e => {
    e.preventDefault();
    let query = document.getElementById('searchQuery');
    let format = document.getElementById('searchFormat');
    let type = document.getElementById('searchType');

    let parentElem = document.getElementById('resultsDisplay')
    while (parentElem.firstChild) {
        parentElem.removeChild(parentElem.firstChild);
    }

    apiResults = [];

    document.getElementById('searchContent').style.display = 'block';
    document.getElementById('browseTab').style.display = 'inline-block';
    document.getElementById('collTab').style.display = 'inline-block';

    if (type.value === 'Artist') {
        try {
            getDiscogsArtist(query.value, format.value, type.value);
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    } else if (type.value === 'Album/Single/Other') {
        try {
            getDiscogsAlbum(query.value, format.value, type.value);
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    } else {
        alert('Error: Please try again.')
    }
    
})   

