const express = require("express");
const router = express.Router();
const axios = require("axios");

//* get trending people
router.get("/trending", async (req, res) => {
	try {
		const url = `https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.TMDB_API_KEY}`;

		const response = await axios.get(url);

		res.send(response.data);
	} catch (error) {
		console.log(error);
	}
});

//* gets person details
router.get("/detail/:id", async (req, res) => {
	try {
		const url = `https://api.themoviedb.org/3/person/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`;

		const response = await axios.get(url);

		res.send(response.data);
	} catch (error) {
		console.log(error);
	}
});

//* gets tagged images of the person
router.get("/tagged-images/:id", async (req, res) => {
	try {
		const url = `https://api.themoviedb.org/3/person/${req.params.id}/tagged_images?api_key=${process.env
			.TMDB_API_KEY}`;

		const response = await axios.get(url);

		res.send(response.data);
	} catch (error) {
		console.log(error);
	}
});

//* gets combined credits of the person
router.get("/combined-credits/:id", async (req, res) => {
	try {
		const url = `https://api.themoviedb.org/3/person/${req.params.id}/combined_credits?api_key=${process.env
			.TMDB_API_KEY}`;

		const response = await axios.get(url);

		res.send(response.data);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
