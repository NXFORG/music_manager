
//Populated with results fetched from the server
let apiResults = [];

let moreInfoResults;

//Set values = to specific album result data
const displayResults = () => {
    for(album in apiResults){
        try {
            apiResults[album].type === 'Album/Single/Other' ? createAlbumListing(apiResults[album]) : createArtistListing(apiResults[album]);
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    } 
}

//Display each listing on the DOM
const createAlbumListing = (album) => {
    //Create each element for the listing
    let newListing = document.createElement('section');
    let newFigure = document.createElement('figure');
    let newFigImg = document.createElement('img');
    let newFigCaption = document.createElement('figcaption');
    let addBtn = document.createElement('button');
    let detailsBtn = document.createElement('button');
    
    //Set class attributes
    addBtn.setAttribute('class', 'addButton');
    detailsBtn.setAttribute('class', 'detailsButton');
    newListing.setAttribute('class', 'albumListing');

    //Set button text
    addBtn.innerText = "+"; 
    detailsBtn.innerText = "☰";
    newFigCaption.textContent = album.title;
    if(album.title.length >= 18){
        newFigCaption.setAttribute('class', 'longerTextSize');
    }
    newFigImg.src = album.image || './src/vinyl.jpg';

    //Append each listing to the DOM
    newFigure.appendChild(newFigImg); 
    newFigure.appendChild(newFigCaption); 
    newFigure.appendChild(detailsBtn);
    newFigure.appendChild(addBtn);
    newListing.appendChild(newFigure)
    document.getElementById('resultsDisplay').appendChild(newListing); 

    let modal = document.getElementById("albumInfo");
    let closeModal = document.getElementsByClassName("close")[0];

    try {
        eventListeners(addBtn, detailsBtn, closeModal, modal, album);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}

const createArtistListing = (album) => {
    let newListing = document.createElement('section');
    let albumHeader = document.createElement('h4');
    let albumDetailList = document.createElement('ul');
    let albumDetailArtist = document.createElement('li');
    let albumDetailYear = document.createElement('li');
    let btnContainer = document.createElement('div');
    let addBtn = document.createElement('button');
    let detailsBtn = document.createElement('button');

    //Set class attributes
    addBtn.setAttribute('class', 'addButton');
    detailsBtn.setAttribute('class', 'detailsButton');
    newListing.setAttribute('class', 'artistListing');
    btnContainer.setAttribute('class', 'btnContainer');

    addBtn.innerText = "+"; 
    detailsBtn.innerText = "☰";
    albumHeader.textContent = album.title;
    albumDetailArtist.textContent = album.artist;
    albumDetailYear.textContent = album.year;

    if(albumTitle.length >= 18){
        albumHeader.setAttribute('class', 'longerTextSize');
    }

    let modal = document.getElementById("albumInfo");
    let closeModal = document.getElementsByClassName("close")[0];

    albumDetailList.appendChild(albumDetailArtist);
    albumDetailList.appendChild(albumDetailYear);
    newListing.appendChild(albumHeader);
    newListing.appendChild(albumDetailList);
    newListing.appendChild(btnContainer);
    btnContainer.appendChild(detailsBtn);
    btnContainer.appendChild(addBtn);
    document.getElementById('resultsDisplay').appendChild(newListing);

    try {
        eventListeners(addBtn, detailsBtn, closeModal, modal, album);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
};

const addAlbumToCollection = async (idVal) => {
    try {
        addToMyCollection(apiResults[idVal], localStorage.getItem('email'));
        //collection.push(apiResults[idVal]);
        alert('Item added to your collection');
    } catch(err) {
        console.log(err);
    }
}

const eventListeners = (addBtn, detailsBtn, closeModal, modal, album) => {

    addBtn.addEventListener('click', e => {
        addAlbumToCollection(album.id);
    })

    detailsBtn.addEventListener('click', e => {
        let modalList = document.getElementsByClassName('relBarcode');
        while(modalList.length > 0){
            document.getElementById('modalText').removeChild(modalList[0]);
        }
        modal.style.display = "block";
        document.getElementById('relTitle').innerText = album.title;
        document.getElementById('relYear').innerText = `Release year: ${album.year}`;
        document.getElementById('relGenre').innerText = `Genre(s): ${album.genre}`;
        for(code of album.barcode){
            let barcodeDisplay = document.createElement('li');
            barcodeDisplay.innerText = `Barcode: ${code}`;
            barcodeDisplay.setAttribute('class', 'relBarcode');
            document.getElementById('modalText').appendChild(barcodeDisplay);
        }
        document.getElementById('relLabel').innerText = `Label: ${album.label}`;
        let modalAdd = document.getElementById('modalAdd');
        modalAdd.setAttribute('value', album.id);
    })

    closeModal.addEventListener('click', e => {
        modal.style.display = "none";
    })

    document.addEventListener('click', e => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });
    
}

modalAdd.addEventListener('click', e => {
    addAlbumToCollection(modalAdd.value);
});

let modalView = document.getElementById('modalView');

/* modalView.addEventListener('click', e => {
    showCollection();
    window.location.href = '#showContainer';
}); */

