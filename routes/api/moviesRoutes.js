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
	try {
		const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&page=1`;
		let data = await axios.get(url);
		data = data.data.results.slice(0, 10);

		let i = 0;
		let newData = {};
		newData.results = [];

		while (i < data.length) {
			const movieVideoUrl = `https://api.themoviedb.org/3/movie/${data[i].id}/videos?api_key=${process.env
				.TMDB_API_KEY}`;

			const videoResult = await axios.get(movieVideoUrl);

			if (videoResult.data.results.length > 0) {
				let videoFilteredArr = videoResult.data.results.filter((videoObj) => {
					return (
						videoObj.type.toLowerCase() === ("trailer" || "teaser") &&
						videoObj.site.toLowerCase() === "youtube"
					);
				});

				let newVideoObj = {};

				if (videoFilteredArr.length > 0) {
					const videoKeys = videoFilteredArr.map((video) => {
						return video.key;
					});

					const videoKeyString = videoKeys.join(",");

					const googleUrl = `https://www.googleapis.com/youtube/v3/videos?key=${process.env
						.YOUTUBE_API_KEY}&part=snippet&id=${videoKeyString}`;

					let newVideoResults = await axios.get(googleUrl);

					newVideoResults = newVideoResults.data.items;

					videoFilteredArr = videoFilteredArr.map((current) => {
						const index = newVideoResults.findIndex((now) => current.key === now.id);

						if (newVideoResults[index].snippet.thumbnails.maxres) {
							return {
								...current,
								maxres: true
							};
						} else {
							return {
								...current,
								maxres: false
							};
						}
					});

					newVideoObj = {
						id: videoResult.data.id,
						results: videoFilteredArr
					};
				}

				const index = data.findIndex((cur) => cur.id === newVideoObj.id);
				const newObj = {
					...data[index],
					video: true,
					videos: newVideoObj.results
				};
				newData.results.push(newObj);
				if (newData.results.length === 5) {
					return res.send(newData);
				}
			}

			i++;
		}
	} catch (error) {
		console.log(error);
	}

	//res.json(seedTrendHero);
});

module.exports = router;
