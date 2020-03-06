const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const User = require("../../models/User");
const Movie = require("../../models/Movie");
const Show = require("../../models/Show");

// add movie to user's movie list
router.post("/movie", auth, async (req, res) => {
	const { vote_count, poster_path, id, backdrop_path, title, overview, vote_average, release_date } = req.body;

	try {
		let movie = await Movie.findOne({ tmdbId: id });

		if (!movie) {
			movie = new Movie({
				tmdbId: id,
				title,
				posterPath: poster_path,
				voteAverage: vote_average,
				overview,
				releaseDate: release_date,
				backdropPath: backdrop_path,
				voteCount: vote_count
			});
			await movie.save();
		} else {
			movie.voteAverage = vote_average;
			movie.voteCount = vote_count;
			movie.overview = overview;
			movie.releaseDate = release_date;

			await movie.save();
		}

		const user = await User.findById(req.user.id);

		user.movieList.unshift(movie);

		await user.save();

		res.status(200).json({ success: true, msg: "Movie is added to watchlist" });
	} catch (error) {
		console.log(error);
	}
});

//remove movie from user's movie list
router.delete("/movie", auth, async (req, res) => {
	const { movieId } = req.body;

	try {
		let movie = await Movie.findOne({ tmdbId: movieId });

		let user = await User.findById(req.user.id);

		user.movieList = user.movieList.filter((current) => current.toString() !== movie.id);

		await user.save();

		res.status(200).json({ success: true, msg: "Movie is removed from the watchlist" });
	} catch (error) {
		console.log(error);
	}
});

// add show to user's show list
router.post("/show", auth, async (req, res) => {
	const { vote_count, poster_path, id, backdrop_path, name, overview, vote_average, first_air_date } = req.body;

	try {
		let show = await Show.findOne({ tmdbId: id });

		if (!show) {
			show = new Show({
				tmdbId: id,
				name,
				posterPath: poster_path,
				voteAverage: vote_average,
				overview,
				firstAirDate: first_air_date,
				backdropPath: backdrop_path,
				voteCount: vote_count
			});
			await show.save();
		} else {
			show.voteAverage = vote_average;
			show.voteCount = vote_count;
			show.overview = overview;
			show.firstAirDate = first_air_date;

			await show.save();
		}

		const user = await User.findById(req.user.id);

		user.showList.unshift(show);

		await user.save();

		res.status(200).json({ success: true, msg: "Show is added to watchlist" });
	} catch (error) {
		console.log(error);
	}
});

//remove show from user's show list
router.delete("/show", auth, async (req, res) => {
	const { showId } = req.body;

	try {
		let show = await Show.findOne({ tmdbId: showId });

		let user = await User.findById(req.user.id);

		user.showList = user.showList.filter((current) => current.toString() !== show.id);

		await user.save();

		res.status(200).json({ success: true, msg: "Show is removed from the watchlist" });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
