require("dotenv").config();
const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const axios = require("axios");
const seedShows = require("./src/seedShows.js");

app.prepare().then(() => {
	const server = express();

	server.get("/api/shows/latest", (req, res) => {
		const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&page=1`;
		axios
			.get(url)
			.then((result) => {
				res.send(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
		// res.json(seedShows);
		console.log("request received");
	});

	server.get("/api/movies/latest", (req, res) => {
		const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&page=1`;
		axios
			.get(url)
			.then((result) => {
				res.send(result.data);
			})
			.catch((err) => {
				console.log(err);
			});

		console.log("movie request received");
	});

	server.get("*", (req, res) => {
		return handle(req, res);
	});

	const PORT = process.env.PORT || 3000;

	server.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Now serving on localhost:${PORT}`);
	});
});
