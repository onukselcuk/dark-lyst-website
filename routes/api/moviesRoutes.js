const express = require("express");
const router = express.Router();
const seedMovies = require("../../src/seedMovies");
const seedTrendHero = require("../../src/seedTrendHero");
const axios = require("axios");

// * Get Latest Movies
router.get("/latest", (req, res) => {
	const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&page=1`;
	// console.log(req.hostname);
	axios
		.get(url)
		.then((result) => {
			res.send(result.data);
		})
		.catch((err) => {
			console.log(err);
		});
	//res.json(seedMovies);
});

// * Get Trending Movies for home page hero section
router.get("/trending-hero", async (req, res) => {
	const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&page=1`;
	let data;
	await axios
		.get(url)
		.then((result) => {
			data = result.data;
		})
		.catch((err) => {
			console.log(err);
		});
	let i = 0;
	let newData = {};
	newData.results = [];
	while (i < data.results.length) {
		const movieVideoUrl = `https://api.themoviedb.org/3/movie/${data.results[i].id}/videos?api_key=${process.env
			.TMDB_API_KEY}`;
		axios
			.get(movieVideoUrl)
			.then(async (videoResult) => {
				if (videoResult.data.results.length > 0) {
					const promises = await videoResult.data.results.map(async (current) => {
						const imageObj = await checkImage(current);
						return imageObj;
					});

					const newVideoResults = await Promise.all(promises);

					videoResult.data.results = newVideoResults;
					return videoResult;
				}
			})
			.then((videoResult) => {
				const index = data.results.findIndex((cur) => cur.id === videoResult.data.id);
				const newObj = {
					...data.results[index],
					video: true,
					videos: videoResult.data.results
				};
				newData.results.push(newObj);
			})
			.then(() => {
				if (newData.results.length === 5) {
					res.send(newData);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		i++;
	}
	//res.json(seedTrendHero);
});

//* checks if the video has youtube max resolution thumbnail
const checkImage = async (current) => {
	await axios
		.get(`https://i.ytimg.com/vi/${current.key}/maxresdefault.jpg`)
		.then((res) => {
			current.maxres = true;
		})
		.catch((err) => {
			current.maxres = false;
		});
	return current;
};

module.exports = router;
