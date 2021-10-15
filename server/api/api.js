//const server = require('./server');
let appendToObject = (apiOutput, type) => {
  for(album in apiOutput){
    let outputData = apiOutput[album]
    let outputId = outputData.master_id || outputData.id;
    let outputReleaseId = outputData.id;
    let outputTitle = outputData.title;
    let outputArtist = outputData.artist || '';
    let outputYear = outputData.year;
    let outputGenre = outputData.genre;
    let outputImage = outputData.thumb;
    let outputBarcode = outputData.barcode;
    let outputOwners = outputData.community;
    let outputLabel = outputData.label;
    let newAlbum = {
      id: parseInt(album),
      disId: outputId,
      type: type,
      title: outputTitle,
      artist: outputArtist,
      genre: outputGenre,
      releaseYear: outputYear,
      image: outputImage,
      barcode: outputBarcode,
      community: outputOwners,
      label: outputLabel
    }
    apiResults.push(newAlbum);
  }
    displayResults();
}

const getDiscogsAlbum = async(artist, format, type) => {

    try {
        let response =  await fetch(`http://localhost:3000/search/${artist}/${format}`);
        let jsonResponse = await response.json();

        appendToObject(jsonResponse.output, type);

    } catch(error) {
        console.error("There was an error handling your request: " + error.message);
    }
}

const getDiscogsArtist = async(artist, format, type) => {

    try {
        let response =  await fetch(`http://localhost:3000/artist/${artist}/${format}`);
        let jsonResponse = await response.json();

        appendToObject(jsonResponse.output.releases, type);
  
        } catch(error) {
          console.error("There was an error handling your request: " + error.message);
        }
}

const getDiscogsArtistDetails = async(releaseId) => {

  try {
      let response =  await fetch(`http://localhost:3000/release/${releaseId}`);
      let jsonResponse = await response.json();

      return jsonResponse.data;

      } catch(error) {
        console.error("There was an error handling your request: " + error.message);
      }
}
        
const moreInfo = async(masterId) => {
    try {
        let response =  await fetch(`http://localhost:3000/more/${masterId}`);
        let jsonResponse = await response.json();

        return(displayMoreInfo(jsonResponse.output));

        } catch(error) {
            console.error("There was an error handling your request: " + error.message);
        }
}

const displayMoreInfo = (apiOutput) => {
    let title = apiOutput.title || 'N/A';
    let artists = apiOutput.artists || 'N/A';
    let genres = apiOutput.genres || ['N/A'];
    let year = apiOutput.year || 'N/A';
    let price = apiOutput.lowest_price || 'N/A';
    let numForSale = apiOutput.num_for_sale || 'N/A';
    let notes = apiOutput.notes || 'N/A';
    let tracks = apiOutput.tracklist || ['N/A'];
    let foundAlbum = {
        title: title,
        artists: artists,
        genres: genres,
        year: year,
        price: price,
        forSale: numForSale,
        notes: notes,
        tracks: tracks
    }
    return foundAlbum;
}