const express = require("express");
const router = express.Router();
const seedShows = require("../../src/seedShows");
const axios = require("axios");
const sub = require("date-fns/sub");
const format = require("date-fns/format");

// * get latest shows
router.get("/latest", (req, res) => {
	const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}`;
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

// * get latest netflix shows (aired in the last 6 months)
router.get("/netflix", async (req, res) => {
	let oldDate = sub(new Date(), { months: 6 });
	oldDate = format(oldDate, "yyyy-MM-dd");
	const today = format(new Date(), "yyyy-MM-dd");

	try {
		let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env
			.TMDB_API_KEY}&include_adult=false&air_date.lte=${today}&air_date.gte=${oldDate}&with_networks=213`;

		const response = await axios.get(url);

		res.send(response.data);
	} catch (error) {
		res.send("something went wrong");
	}
});

// * get latest apple tv+ shows (aired in the last 6 months)
router.get("/apple", async (req, res) => {
	let oldDate = sub(new Date(), { months: 6 });
	oldDate = format(oldDate, "yyyy-MM-dd");
	const today = format(new Date(), "yyyy-MM-dd");

	try {
		let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env
			.TMDB_API_KEY}&include_adult=false&air_date.lte=${today}&air_date.gte=${oldDate}&with_networks=2552`;

		const response = await axios.get(url);

		res.send(response.data);
	} catch (error) {
		res.send("something went wrong");
	}
});

// * get top rated shows all by pagination
router.get("/top-rated", (req, res) => {
	const page = req.query.page;
	const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
	axios
		.get(url)
		.then((result) => {
			res.send(result.data);
		})
		.catch((err) => {
			console.log(err);
		});
});

// * get popular shows all by pagination
router.get("/popular", (req, res) => {
	const page = req.query.page;
	const url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
	axios
		.get(url)
		.then((result) => {
			res.send(result.data);
		})
		.catch((err) => {
			console.log(err);
		});
});

// * get on-air shows all by pagination
router.get("/on-the-air", (req, res) => {
	const page = req.query.page;
	const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
	axios
		.get(url)
		.then((result) => {
			res.send(result.data);
		})
		.catch((err) => {
			console.log(err);
		});
});

// * get latest netflix shows (aired in the last 2 years)
router.get("/latest-on-netflix", async (req, res) => {
	const page = req.query.page;
	let oldDate = sub(new Date(), { years: 2 });
	oldDate = format(oldDate, "yyyy-MM-dd");
	const today = format(new Date(), "yyyy-MM-dd");

	try {
		let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env
			.TMDB_API_KEY}&include_adult=false&air_date.lte=${today}&air_date.gte=${oldDate}&with_networks=213&page=${page}`;

		const response = await axios.get(url);

		res.send(response.data);
	} catch (error) {
		res.send("something went wrong");
	}
});

// * get latest apple-tv-plus shows (aired in the last 2 years)
router.get("/latest-on-apple-tv-plus", async (req, res) => {
	const page = req.query.page;
	let oldDate = sub(new Date(), { years: 2 });
	oldDate = format(oldDate, "yyyy-MM-dd");
	const today = format(new Date(), "yyyy-MM-dd");

	try {
		let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env
			.TMDB_API_KEY}&include_adult=false&air_date.lte=${today}&air_date.gte=${oldDate}&with_networks=2552&page=${page}`;

		const response = await axios.get(url);

		res.send(response.data);
	} catch (error) {
		res.send("something went wrong");
	}
});

module.exports = router;
