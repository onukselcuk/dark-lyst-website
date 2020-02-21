require("dotenv").config();
const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const axios = require("axios");
const seedShows = require("./src/seedShows.js");
const seedMovies = require("./src/seedMovies.js");
const seedTrendHero = require("./src/seedTrendHero.js");

app.prepare().then(() => {
	const server = express();

	server.get("/api/shows/latest", (req, res) => {
		// const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&page=1`;
		// axios
		// 	.get(url)
		// 	.then((result) => {
		// 		res.send(result.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		res.json(seedShows);
	});

	server.get("/api/movies/latest", (req, res) => {
		// const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&page=1`;
		// // console.log(req.hostname);
		// axios
		// 	.get(url)
		// 	.then((result) => {
		// 		res.send(result.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		res.json(seedMovies);
	});

	server.get("/api/movies/trending-hero", async (req, res) => {
		// const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&page=1`;
		// let data;
		// await axios
		// 	.get(url)
		// 	.then((result) => {
		// 		data = result.data;
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		// let i = 0;
		// let newData = {};
		// newData.results = [];
		// while (i < data.results.length) {
		// 	const movieVideoUrl = `https://api.themoviedb.org/3/movie/${data.results[i].id}/videos?api_key=${process.env
		// 		.TMDB_API_KEY}`;
		// 	axios
		// 		.get(movieVideoUrl)
		// 		.then(async (videoResult) => {
		// 			if (videoResult.data.results.length > 0) {
		// 				const promises = await videoResult.data.results.map(async (current) => {
		// 					const imageObj = await checkImage(current);
		// 					return imageObj;
		// 				});

		// 				const newVideoResults = await Promise.all(promises);

		// 				videoResult.data.results = newVideoResults;
		// 				return videoResult;
		// 			}
		// 		})
		// 		.then((videoResult) => {
		// 			const index = data.results.findIndex((cur) => cur.id === videoResult.data.id);
		// 			const newObj = {
		// 				...data.results[index],
		// 				video: true,
		// 				videos: videoResult.data.results
		// 			};
		// 			newData.results.push(newObj);
		// 		})
		// 		.then(() => {
		// 			if (newData.results.length === 5) {
		// 				res.send(newData);
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		// 	i++;
		// }
		res.json(seedTrendHero);
	});

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

	server.get("*", (req, res) => {
		return handle(req, res);
	});

	const PORT = process.env.PORT || 3000;

	server.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Now serving on localhost:${PORT}`);
	});
});
