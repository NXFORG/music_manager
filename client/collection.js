let collection = [];

const moreInfoClicked = async (discogsId) => {
    document.getElementById('albumDetails').style.display = 'block';
    document.getElementById('notesContainer').style.display = 'block';
    document.getElementById('albumTrackList').style.display = 'block';
    let foundAlbum;
    try {
        foundAlbum = await moreInfo(discogsId);
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

const displayCollection = (collTable) => {
    for(album in collection){
        let tableRow = document.createElement("tr");
        let titleField = document.createElement("td");
        let yearField = document.createElement("td");
        let genreField = document.createElement("td");
        let communityHaveField = document.createElement("td");
        let communityWantField = document.createElement("td");
        let moreInfoField = document.createElement("td");
        let moreInfoButton = document.createElement('button');

        communityHaveField.setAttribute('id', `haveField${collection[album].id}`);
        communityWantField.setAttribute('id', `wantField${collection[album].id}`);
        moreInfoButton.setAttribute('value', collection[album].relid);

        let haveVal = collection[album].relhave;
        let wantVal = collection[album].relwant;

        let titleVal = document.createTextNode(collection[album].reltitle);
        let yearVal = document.createTextNode(collection[album].relyear || "N/A");
        let genreVal = document.createTextNode(collection[album].relgenre || "N/A");
        let communityHaveVal = document.createTextNode(haveVal) || "N/A";
        let communityWantVal = document.createTextNode(wantVal) || "N/A";
        moreInfoButton.textContent = "View";

        let collDisplay = document.getElementById('collectionDisplay');
        
        collDisplay.appendChild(collTable);
        collTable.appendChild(tableRow);
        tableRow.appendChild(titleField);
        tableRow.appendChild(yearField);
        tableRow.appendChild(genreField);
        tableRow.appendChild(communityHaveField);
        tableRow.appendChild(communityWantField);
        tableRow.appendChild(moreInfoField);
        titleField.appendChild(titleVal);
        yearField.appendChild(yearVal);
        genreField.appendChild(genreVal);
        communityHaveField.appendChild(communityHaveVal);
        communityWantField.appendChild(communityWantVal);
        moreInfoField.appendChild(moreInfoButton);

        let haveFieldId = document.getElementById(`haveField${collection[album].id}`);
        let wantFieldId = document.getElementById(`wantField${collection[album].id}`);

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

        moreInfoButton.addEventListener('click', e => {
            console.log(moreInfoButton.value);
            moreInfoClicked(moreInfoButton.value);
        })
    }
}

const getCollection = async (table) => {
    try {
        collection = await getFromMyCollection(localStorage.getItem('email'));
        displayCollection(table);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
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
    yearHeader.appendChild(yearHeaderVal);
    genreHeader.appendChild(genreHeaderVal);
    communityHaveHeader.appendChild(communityHaveHeaderVal);
    communityWantHeader.appendChild(communityWantHeaderVal);
    moreInfoHeader.appendChild(moreInfoHeaderVal)
    
    getCollection(collTable);
}

let showColl = document.getElementById('showCollection');
let titleFilter = document.getElementById('titleFilter');
let yearFilter = document.getElementById('yearFilter');
let genreFilter = document.getElementById('genreFilter');
let ownerFilter = document.getElementById('ownerFilter');
let demandFilter = document.getElementById('demandFilter');
let toTop = document.getElementById('toTop');

showColl.addEventListener('click', e => {
    showCollection();
});

titleFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.reltitle.localeCompare(b.reltitle));
    showCollection();
});

yearFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.relyear - b.relyear);
    showCollection();
});

genreFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.genre.localeCompare(b.relgenre));
    showCollection();
});

ownerFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.relhave - b.relhave);
    showCollection();
});

demandFilter.addEventListener('click', e => {
    collection.sort((a, b) => a.relwant - b.relwant);
    showCollection();
});

toTop.addEventListener('click', e => {
    window.location.href = '#';
});

let showManage = document.getElementById('showManageCollection');

const calcCollectionValue = async () => {
    let totalValue = 0;
    let getAlbum;
    for(album in collection){
        try {
            getAlbum = await moreInfo(collection[album].relid);
            getAlbum.price ? totalValue += getAlbum.price : totalValue += 0;
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }
    collValue.innerHTML = `Minimum value: £<span>${totalValue.toFixed(2)}</span>`;
}

const suggestASong = async () => {
    let allTracks = [];
    const albumIndex = Math.floor(Math.random() * collection.length);
    let newAlbum = await moreInfo(collection[albumIndex].relid);
    
    newAlbum.tracks.forEach(track => allTracks.push({
        track: track.title, artist: newAlbum.artist
    })); 

    songShuffler(allTracks);
}

const songShuffler = allTracks => {
    const index = Math.floor(Math.random() * allTracks.length);
    let randomSong = document.getElementById('showSong');
    randomSong.textContent = 'A song from your collection: ' + allTracks[index].track + ' - ' + allTracks[index].artist.name;
}

showManage.addEventListener('click', e => {
    document.getElementById('manageDisplay').style.display = 'grid';

    let itemsOwned = document.getElementById('itemsOwned');
    let collValue = document.getElementById('collValue');
    let favouriteGenre = document.getElementById('favouriteGenre');
    let uniqColl = document.getElementById('uniqColl');

    itemsOwned.innerHTML = `Your collection size is <span>${collection.length}</span> items`;
    calcCollectionValue();

    let totalOccurence = 1;
    let occurence = 0;
    let find;
    for (let i = 0; i < collection.length; i++){
        for (let j = i; j < collection.length; j++){
                collection[i].relgenre === collection[j].relgenre && occurence++;
                if (totalOccurence < occurence){
                  totalOccurence = occurence; 
                  find = collection[i].relgenre;
                }
        }
        occurence = 0;
    }
    favouriteGenre.textContent = `Most common genre: ${find}, found ${totalOccurence} times.`;

    console.log(collection)
    ownerTotal = collection.map(collAlbum => collAlbum.relhave || 0).reduce((prev, next) => prev + next);
    uniqColl.textContent = `${(ownerTotal/collection.length).toFixed(0)} other collectors have similar items to you.`;

    suggestASong();

});

let printButtonPdf = document.getElementById('printButtonPdf');
printButtonPdf.addEventListener('click', e => {
    let newWindow = window.open('');
    newWindow.document.write('My Collection');
    newWindow.document.write('<br>');

    for(album in collection){
        newWindow.document.write(`Title: ${collection[album].reltitle} Release year: ${collection[album].relyear} Genre: ${collection[album].relgenre.join(', ')}`);
        newWindow.document.write('<br>');
    }

    newWindow.print();
});

let printButtonCsv = document.getElementById('printButtonCsv');
printButtonCsv.addEventListener('click', e => {

    let csvContent = [];
    csvContent.push('Index', 'Artist/Title', 'Year', 'Genre', 'Label', 'Have', 'Want');
    for(album in collection){
        csvContent.push(`${album} ${collection[album].reltitle}, ${collection[album].relyear}, ${collection[album].relgenre}, ${collection[album].rellabel}, ${collection[album].relhave}, ${collection[album].relwant}\n`);
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