
//Populated with results fetched from the server
let apiResults = [];

//Populated with results selected by the user
let collection = [];

let moreInfoResults;

//Global variables for album values

let id;
let disId;
let title;
let genre;
let year;
let image;
let barcode;
let community;
let label;

//Set values = to specific album result data
const displayResults = () => {
    for(album of apiResults){
        id = album.id;
        disId = album.disId;
        type = album.type;
        title = album.title;
        artist = album.artist;
        genre = album.genre || [];
        year = album.releaseYear;
        image = album.image || '';
        barcode = album.barcode || [];
        community = album.community;
        label = album.label || '';
        try {
            type === 'Album/Single/Other' ? createAlbumListing(title, image, id) : createArtistListing(title, id, year, artist);
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    } 
}

//Display each listing on the DOM
const createAlbumListing = (albumTitle, image, albumId) => {
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
    newFigCaption.textContent = albumTitle;
    if(albumTitle.length >= 18){
        newFigCaption.setAttribute('class', 'longerTextSize');
    }
    newFigImg.src = image || './src/vinyl.jpg';

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
        eventListeners(addBtn, detailsBtn, closeModal, modal, albumId, albumTitle, genre, year, barcode, label);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}

const createArtistListing = (albumTitle, albumId, albumYear, albumArtist) => {
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
    albumHeader.textContent = albumTitle;
    albumDetailArtist.textContent = albumArtist;
    albumDetailYear.textContent = albumYear;

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
        eventListeners(addBtn, detailsBtn, closeModal, modal, albumId, albumTitle, genre, year, barcode, label);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
};

const addAlbumToCollection = (idVal) => {
    collection.push(apiResults[idVal]);
    alert('Item added to your collection');
}

const eventListeners = (addBtn, detailsBtn, closeModal, modal, albumId, albumTitle, genre="No  genre(s) found", year="No release year found", barcode="No barcode(s) found", label="No label(s) found") => {

    addBtn.addEventListener('click', e => {
        addAlbumToCollection(albumId);
    })

    detailsBtn.addEventListener('click', e => {
        let modalList = document.getElementsByClassName('relBarcode');
        while(modalList.length > 0){
            document.getElementById('modalText').removeChild(modalList[0]);
        }
        modal.style.display = "block";
        document.getElementById('relTitle').innerText = albumTitle;
        document.getElementById('relYear').innerText = `Release year: ${year}`;
        document.getElementById('relGenre').innerText = `Genre(s): ${genre}`;
        for(code of barcode){
            let barcodeDisplay = document.createElement('li');
            barcodeDisplay.innerText = `Barcode: ${code}`;
            barcodeDisplay.setAttribute('class', 'relBarcode');
            document.getElementById('modalText').appendChild(barcodeDisplay);
        }
        document.getElementById('relLabel').innerText = `Label: ${label}`;
        let modalAdd = document.getElementById('modalAdd');
        modalAdd.setAttribute('value', albumId);
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

const showCollection = () => {
    let filters = document.getElementById('tableFilters');
    let parent = document.getElementById('collectionDisplay');
    document.getElementById('showContainer').style.display = 'grid';
    document.getElementById('manageHeader').style.display = 'block';
    document.getElementById('manageTab').style.display = 'inline-block';
    filters.style.display = 'block';
    while(parent.firstChild){
        parent.firstChild.remove()
    }
    let collDisplay = document.getElementById('collectionDisplay');

    let collTable = document.createElement('table');
    let tableHeaderRow = document.createElement("tr");
    let titleHeader = document.createElement("td");
    let genreHeader = document.createElement("td");
    let yearHeader = document.createElement("td");
    let communityHaveHeader = document.createElement("td");
    let communityWantHeader = document.createElement("td");
    let moreInfoHeader = document.createElement("td");

    let titleHeaderVal = document.createTextNode("Title");
    let yearHeaderVal = document.createTextNode("Release Year");
    let genreHeaderVal = document.createTextNode("Genre(s)");
    let communityHaveHeaderVal = document.createTextNode("Other Owners");
    let communityWantHeaderVal = document.createTextNode("Demand");
    let moreInfoHeaderVal = document.createTextNode("More Information");
    tableHeaderRow.setAttribute('id', 'collTableHeader');
    tableHeaderRow.style.color = "white";

    collTable.appendChild(tableHeaderRow);
    tableHeaderRow.appendChild(titleHeader);
    tableHeaderRow.appendChild(yearHeader);
    tableHeaderRow.appendChild(genreHeader);
    tableHeaderRow.appendChild(communityHaveHeader);
    tableHeaderRow.appendChild(communityWantHeader);
    tableHeaderRow.appendChild(moreInfoHeader);
    titleHeader.appendChild(titleHeaderVal);
    genreHeader.appendChild(genreHeaderVal);
    yearHeader.appendChild(yearHeaderVal);
    communityHaveHeader.appendChild(communityHaveHeaderVal);
    communityWantHeader.appendChild(communityWantHeaderVal);
    moreInfoHeader.appendChild(moreInfoHeaderVal)

    for(album of collection){
        let tableRow = document.createElement("tr");
        let titleField = document.createElement("td");
        let genreField = document.createElement("td");
        let yearField = document.createElement("td");
        let communityHaveField = document.createElement("td");
        let communityWantField = document.createElement("td");
        let moreInfoField = document.createElement("td");
        let moreInfoButton = document.createElement('button');

        communityHaveField.setAttribute('id', `haveField${album.id}`);
        communityWantField.setAttribute('id', `wantField${album.id}`);
        moreInfoButton.setAttribute('value', album.disId);

        let haveVal = parseInt(album.community.have);
        let wantVal = parseInt(album.community.want);

        let titleVal = document.createTextNode(album.title);
        let yearVal = document.createTextNode(album.releaseYear || "N/A");
        let genreVal = document.createTextNode(album.genre || "N/A");
        let communityHaveVal = document.createTextNode(haveVal) || "N/A";
        let communityWantVal = document.createTextNode(wantVal) || "N/A";
        moreInfoButton.textContent = "View";

        
        collDisplay.appendChild(collTable);
        collTable.appendChild(tableRow);
        tableRow.appendChild(titleField);
        tableRow.appendChild(yearField);
        tableRow.appendChild(genreField);
        tableRow.appendChild(communityHaveField);
        tableRow.appendChild(communityWantField);
        tableRow.appendChild(moreInfoField);
        titleField.appendChild(titleVal);
        genreField.appendChild(genreVal);
        yearField.appendChild(yearVal);
        communityHaveField.appendChild(communityHaveVal);
        communityWantField.appendChild(communityWantVal);
        moreInfoField.appendChild(moreInfoButton);

        let haveFieldId = document.getElementById(`haveField${album.id}`);
        let wantFieldId = document.getElementById(`wantField${album.id}`);

        if(haveVal < 1000){
            haveFieldId.style.color = "green";
        } else if(haveVal < 5000){
            haveFieldId.style.color = "orange";
        } else {
            haveFieldId.style.color = "red";
        }

        if(wantVal < 1000){
            wantFieldId.style.color = "red";
        } else if(wantVal < 5000){
            wantFieldId.style.color = "orange";
        } else {
            wantFieldId.style.color = "green";
        }

        const moreInfoClicked = async (discogsId) => {
            document.getElementById('albumDetails').style.display = 'block';
            document.getElementById('notesContainer').style.display = 'block';
            document.getElementById('albumTrackList').style.display = 'block';
            let foundAlbum;
            try {
                foundAlbum = await moreInfo(discogsId);
                console.log(foundAlbum);
            } catch(err) {
                console.log(`Error: ${err}`);
            }

            let displayTitle = document.getElementById('albumTitle');
            let displayArtists = document.getElementById('albumArtists');
            let displayYear = document.getElementById('albumYear');
            let displayPrice = document.getElementById('albumPrice');
            let displaySales = document.getElementById('albumSales');
            let displayNotes = document.getElementById('albumNotes');
            let displayTracks = document.getElementById('albumTracks');

            while(displayArtists.firstChild){
                displayArtists.firstChild.remove()
            }

            while(displayTracks.firstChild){
                displayTracks.firstChild.remove()
            }
        
            displayTitle.textContent = foundAlbum.title;
            displayYear.textContent = `Originally released: ${foundAlbum.year || 'N/A'}`;
            displayPrice.textContent = `Lowest price on Discogs: £${foundAlbum.price || 'N/A'}`;
            displaySales.textContent = `Copies currently for sale on Discogs: ${foundAlbum.forSale || 'N/A'}`;
            displayNotes.textContent = foundAlbum.notes || 'N/A';

            if(foundAlbum.artists){
                for(artist of foundAlbum.artists){
                    let artistListing = document.createElement('li');
                    artistListing.textContent = `Artist: ${artist.name}`;
                    displayArtists.appendChild(artistListing);
                }
            }
            
            if(foundAlbum.tracks){
                for(track of foundAlbum.tracks){
                    let trackListing = document.createElement('li');
                    trackListing.innerHTML = `Position: <span>${track.position || 'N/A'}</span> Title: <span>${track.title}</span> Duration: <span>${track.duration || 'N/A'}</span>`;
                    displayTracks.appendChild(trackListing);
                }
            }
        }

        moreInfoButton.addEventListener('click', e => {
            moreInfoClicked(moreInfoButton.value);
        })
    }
}

modalAdd.addEventListener('click', e => {
    addAlbumToCollection(modalAdd.value);
});

let showColl = document.getElementById('showCollection');
let modalView = document.getElementById('modalView');
let titleFilter = document.getElementById('titleFilter');
let yearFilter = document.getElementById('yearFilter');
let genreFilter = document.getElementById('genreFilter');
let ownerFilter = document.getElementById('ownerFilter');
let demandFilter = document.getElementById('demandFilter');
let toTop = document.getElementById('toTop');

showColl.addEventListener('click', e => {
    showCollection();
});

modalView.addEventListener('click', e => {
    showCollection();
    window.location.href = '#showContainer';
});

titleFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.title.localeCompare(b.title));
    showCollection();
});

yearFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.releaseYear - b.releaseYear);
    showCollection();
});

genreFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.genre[0].localeCompare(b.genre[0]));
    showCollection();
});

ownerFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.community.have - b.community.have);
    showCollection();
});

demandFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.community.want - b.community.want);
    showCollection();
});

toTop.addEventListener('click', e => {
    window.location.href = '#';
});

let showManage = document.getElementById('showManageCollection');

showManage.addEventListener('click', e => {
    document.getElementById('manageDisplay').style.display = 'grid';

    let itemsOwned = document.getElementById('itemsOwned');
    let collValue = document.getElementById('collValue');
    let favouriteGenre = document.getElementById('favouriteGenre');
    let uniqColl = document.getElementById('uniqColl');
    let randomSong = document.getElementById('showSong');

    const calcCollectionValue = async () => {
        let totalValue = 0;
        for(album in collection){
            try {
                foundAlbum = await moreInfo(collection[album].disId);
                foundAlbum.price ? totalValue += foundAlbum.price : totalValue += 0;
            } catch(err) {
                console.log(`Error: ${err}`);
            }
        }
        collValue.innerHTML = `Minimum value: £<span>${totalValue.toFixed(2)}</span>`;
    }

    itemsOwned.innerHTML = `Your collection size is <span>${collection.length}</span> items`;
    calcCollectionValue();

    let totalOccurence = 1;
    let occurence = 0;
    let find;
    for (let i = 0; i < collection.length; i++){
        for (let j = i; j < collection.length; j++){
                collection[i].genre[0] === collection[j].genre[0] && occurence++;
                if (totalOccurence < occurence){
                  totalOccurence = occurence; 
                  find = collection[i].genre[0];
                }
        }
        occurence = 0;
    }
    favouriteGenre.textContent = `Most common genre: ${find}, found ${totalOccurence} times.`;

    ownerTotal = collection.map(collAlbum => collAlbum.community.have || 0).reduce((prev, next) => prev + next);
    uniqColl.textContent = `${(ownerTotal/collection.length).toFixed(0)} other collectors have similar items to you.`;

    const suggestASong = async () => {
        let allTracks = [];
        for(album in collection){
            let foundAlbum = await moreInfo(collection[album].disId);
            foundAlbum.tracks.forEach(track => allTracks.push({
                track: track.title, artist: foundAlbum.artists
            })); 
        }
        songShuffler(allTracks);
    }

    const songShuffler = allTracks => {
        console.log(allTracks);
        const index = Math.floor(Math.random() * allTracks.length);
        randomSong.textContent = 'A song from your collection: ' + allTracks[index].track + ' - ' + allTracks[index].artist[0].name;
    }

   suggestASong();

});

let printButtonPdf = document.getElementById('printButtonPdf');
printButtonPdf.addEventListener('click', e => {
    let newWindow = window.open('');
    newWindow.document.write('My Collection');
    newWindow.document.write('<br>');

    for(album in collection){
        newWindow.document.write(`Title: ${collection[album].title} Release year: ${collection[album].releaseYear} Genre: ${collection[album].genre.join(', ')}`);
        newWindow.document.write('<br>');
    }

    newWindow.print();
});

let printButtonCsv = document.getElementById('printButtonCsv');
printButtonCsv.addEventListener('click', e => {

    let csvContent = [];
    csvContent.push('Index', 'Artist/Title', 'Year', 'Genre', 'Label', 'Have', 'Want');
    for(album in collection){
        csvContent.push(`${album} ${collection[album].title}, ${collection[album].releaseYear}, ${collection[album].genre[0]}, ${collection[album].label[0]}, ${collection[album].community.have}, ${collection[album].community.want}\n`);
    }

    let csvFile = 'data:text/csv;charset=utf-8,' + csvContent.join(', ');
    let csvEncode = encodeURI(csvFile);
    let download = document.createElement('a');
    let today = new Date();
    let curDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate

    download.setAttribute('href', csvEncode);
    download.setAttribute('download', `record_collection_${curDate}.csv`);
    document.body.appendChild(download);
    download.click();
});