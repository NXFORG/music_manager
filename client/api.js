class Media {
    constructor(title, artist, year, genre){
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.year = year;
    }
}

class Album extends Media {
    constructor(data, id, type) {
        super(data.title, data.artist || '', data.year, data.genre[0]);
        this.id = id;
        this.relId = data.master_id;
        this.type = type;
        this.image = data.thumb;
        this.barcode = data.barcode;
        this.have = data.community.have;
        this.want = data.community.want;
        this.label = data.label;
    }
}

class Release extends Media {
    constructor(data){
        super(data.title || 'N/A', data.artists[0] || 'N/A', data.year || 'N/A', data.genres[0] || 'N/A');
        this.price = data.lowest_price;
        this.forSale = data.num_for_sale || 'N/A';
        this.notes = data.notes || 'N/A';
        this.tracks = data.tracklist || 'N/A';
    }
}

const getDiscogsAlbum = async(artist, format, type) => {

    try {
        let response =  await fetch(`http://localhost:3000/albums/search/${artist}/${format}`, {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') })
        });
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
        
const displayMoreInfo = (apiOutput) => {
    let foundAlbum = new Release(apiOutput);
    return foundAlbum;
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

const addToMyCollection = async(album, email) => {
    try {
        await fetch(`http://localhost:3000/albums/collection/user`, {
            method: "POST",
            body: JSON.stringify(
                { 
                    email: email,
                    relid: album.relId,
                    reltitle: album.title,
                    relartist: album.artist || '',
                    relgenre: album.genre,
                    relyear: album.year,
                    reltype: album.type,
                    relimage: album.image,
                    relbarcode: album.barcode,
                    relhave: album.have,
                    relwant: album.want,
                    rellabel: album.label
                }
            ),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
    } catch(err) {
        console.log(err);
    }
}

const getFromMyCollection = async(email) => {
    try {
        const coll = await fetch(`http://localhost:3000/albums/collection/${email}`);
        const result = await coll.json();
        return result.output;
    } catch(err) {
        console.log(err);
    }
}

let appendToObject = (apiOutput, type) => {
  for(albumRes in apiOutput){
    let outputData = apiOutput[albumRes]
    let newAlbum = new Album(outputData, albumRes, type);
    apiResults.push(newAlbum);
  }
    displayResults();
}
