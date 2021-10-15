const dotenv = require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
const port = 3000;
app.use(cors());

//Welcome message get route
app.get("/", (req, res) => res.send("Welcome to Collection Manager"));

//Artist/album search get route 
app.get("/search/:query/:format", async (req, res) => {
	try {

		const searchString = `${req.params.query}`;
		const searchFormat = `${req.params.format}`;

		let apiKey = process.env.API_KEY;
		let apiSecret = process.env.API_SECRET;

		//Perform axios get on API endpoint
        const response = await axios.get(`https://api.discogs.com/database/search?q=${searchString}&format=${searchFormat}&per_page=75&key=${apiKey}&secret=${apiSecret}`);
	
		return res.json({
            success: true,
            output: response.data.results
        });

	} catch (err) {

		return res.status(500).json({
			success: false,
			error_message: err.message
		});

	}
});

//Route to get releases from an artist
app.get("/artist/:name/:format", async (req, res) => {
	try {

		const searchArtist = `${req.params.name}`;
		const searchArtistFormat = `${req.params.format}`;

		let apiKey = process.env.API_KEY;
		let apiSecret = process.env.API_SECRET;

		//Perform axios get on API endpoint
        const idResponse = await axios.get(`https://api.discogs.com/database/search?q=${searchArtist}&type=artist&per_page=10&key=${apiKey}&secret=${apiSecret}`);
		const idResName = idResponse.data.results[0].id;

		//Perform axios get on API endpoint
        const response = await axios.get(`https://api.discogs.com/artists/${idResName}/releases?year,asc&format=${searchArtistFormat}page=5&per_page=100`);
	
		return res.json({
            success: true,
            output: response.data
        });

	} catch (err) {

		return res.status(500).json({
			success: false,
			error_message: err.message,
		});

	}
});

app.get("/release/:relid", async (req, res) => {
	try {
		const searchRelease = `${req.params.relid}`;

		const relResponse = await axios.get(`https://api.discogs.com/releases/${searchRelease}?GBP`);

		return res.json({
            success: true,
            output: relResponse.data
        });

	} catch(err) {
		return res.status(500).json({
			success: false,
			error_message: err.message,
		});
	}
});

app.get("/more/:master", async (req, res) => {
	try {

		const searchMaster = req.params.master;
		
		//Perform axios get on API endpoint
        const moreInfoResponse = await axios.get(`https://api.discogs.com/masters/${searchMaster}`);
		
		return res.json({
            success: true,
            output: moreInfoResponse.data
        }); 

	} catch (err) {

		return res.status(500).json({
			success: false,
			error_message: err.message,
		});
	}
});

//Start server
app.listen(port, () => console.log(`Collection manager listening on port ${port}`));