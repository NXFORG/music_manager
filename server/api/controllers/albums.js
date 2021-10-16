const dotenv = require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const router = express.Router();

router.use(express.json());
router.use(cors());

router.get("/search/:query/:format", async (req, res) => {
	try {
		const searchString = req.params.query;
		const searchFormat = req.params.format;

		let apiKey = process.env.API_KEY;
		let apiSecret = process.env.API_SECRET;

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
router.get("/artist/:name/:format", async (req, res) => {
	try {
		const searchArtist = req.params.name;
		const searchArtistFormat = req.params.format;

		let apiKey = process.env.API_KEY;
		let apiSecret = process.env.API_SECRET;

        const idResponse = await axios.get(`https://api.discogs.com/database/search?q=${searchArtist}&type=artist&per_page=10&key=${apiKey}&secret=${apiSecret}`);
		const idResName = idResponse.data.results[0].id;
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

router.get("/release/:relid", async (req, res) => {
	try {
		const searchRelease = req.params.relid;
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

router.get("/more/:master", async (req, res) => {
	try {
		const searchMaster = req.params.master;
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

module.exports = router