const express = require("express");
const router = express.Router();
const seedShows = require("../../src/seedShows");
const axios = require("axios");

router.get("/latest", (req, res) => {
	const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&page=1`;
	axios
		.get(url)
		.then((result) => {
			res.send(result.data);
		})
		.catch((err) => {
			console.log(err);
		});
	//res.json(seedShows);
});

module.exports = router;
