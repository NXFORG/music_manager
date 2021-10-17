class Media {
    constructor(title, artist, year, genre){
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.year = year;
    }
}

class Album extends Media {
    constructor(id, relId, type, title, artist, year, genre, image, barcode, owners, label) {
        super(title, artist, year, genre);
        this.id = id;
        this.relId = relId;
        this.type = type;
        this.image = image;
        this.barcode = barcode;
        this.owners = owners;
        this.label = label;
    }
}

class Release extends Media {
    constructor(title, artist, year, genre, price, numForSale, notes, tracks){
        super(title, artist, year, genre);
        this.price = price;
        this.forSale = numForSale;
        this.notes = notes;
        this.tracks = tracks;
    }
}

const getDiscogsAlbum = async(artist, format, type) => {

    try {
        let response =  await fetch(`http://localhost:3000/albums/search/${artist}/${format}`);
        let jsonResponse = await response.json();

        appendToObject(jsonResponse.output, type);

    } catch(error) {
        console.error("There was an error handling your request: " + error.message);
    }
}

const getDiscogsArtist = async(artist, format, type) => {

    try {
        let response =  await fetch(`http://localhost:3000/albums/artist/${artist}/${format}`);
        let jsonResponse = await response.json();

        appendToObject(jsonResponse.output.releases, type);
  
        } catch(error) {
          console.error("There was an error handling your request: " + error.message);
        }
}

const getDiscogsArtistDetails = async(releaseId) => {

  try {
      let response =  await fetch(`http://localhost:3000/albums/release/${releaseId}`);
      let jsonResponse = await response.json();

      return jsonResponse.data;

      } catch(error) {
        console.error("There was an error handling your request: " + error.message);
      }
}
        
const moreInfo = async(masterId) => {
    try {
        let response =  await fetch(`http://localhost:3000/albums/more/${masterId}`);
        let jsonResponse = await response.json();

        return(displayMoreInfo(jsonResponse.output));

        } catch(error) {
            console.error("There was an error handling your request: " + error.message);
        }
}

let appendToObject = (apiOutput, type) => {
  for(albumRes in apiOutput){
    let outputData = apiOutput[albumRes]
    let outputId = outputData.master_id || outputData.id;
    let outputType = type;
    let outputTitle = outputData.title;
    let outputArtist = outputData.artist || '';
    let outputYear = outputData.year;
    let outputGenre = outputData.genre;
    let outputImage = outputData.thumb;
    let outputBarcode = outputData.barcode;
    let outputOwners = outputData.community;
    let outputLabel = outputData.label;
    let newAlbum = new Album(parseInt(albumRes), outputId, outputType, outputTitle, outputArtist, outputYear, outputGenre, outputImage, outputBarcode, outputOwners, outputLabel);
    apiResults.push(newAlbum);
  }
    displayResults();
}

const displayMoreInfo = (apiOutput) => {
    let title = apiOutput.title || 'N/A';
    let artist = apiOutput.artists || 'N/A';
    let genre = apiOutput.genres || ['N/A'];
    let year = apiOutput.year || 'N/A';
    let price = apiOutput.lowest_price || 'N/A';
    let numForSale = apiOutput.num_for_sale || 'N/A';
    let notes = apiOutput.notes || 'N/A';
    let tracks = apiOutput.tracklist || ['N/A'];
    let foundAlbum = new Release(title, artist, year, genre, price, numForSale, notes, tracks);
    return foundAlbum;
}