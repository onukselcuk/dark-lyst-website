const express = require("express");
const router = express.Router();
const axios = require("axios");
const seedMovieDetail = require("../../src/seedMovieDetail");

router.get("/detail/:id", async (req, res) => {
	const url = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env
		.TMDB_API_KEY}&append_to_response=videos,images`;
	let data = {};
	await axios
		.get(url)
		.then((result) => {
			data = result.data;
		})
		.catch((err) => {
			console.log(err);
		});
	const creditsUrl = `https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env
		.TMDB_API_KEY}`;
	await axios
		.get(creditsUrl)
		.then((creditsResult) => {
			data.credits = creditsResult.data;
			res.send(data);
		})
		.catch((err) => {
			console.log(err);
		});
	//res.json(seedMovieDetail);
});

module.exports = router;
