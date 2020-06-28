const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const User = require("../../models/User");
const Movie = require("../../models/Movie");
const Show = require("../../models/Show");
const Person = require("../../models/Person");
const { logger } = require("../../config/logger");

// add movie to user's movie list
router.post("/movie", auth, async (req, res) => {
    const {
        vote_count,
        poster_path,
        id,
        backdrop_path,
        title,
        overview,
        vote_average,
        release_date
    } = req.body;

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

        const user = await User.findOne({ email: req.user.email });

        user.movieList.unshift(movie);

        await user.save();

        res.status(200).json({
            success: true,
            msg: "Movie is added to watchlist"
        });
    } catch (error) {
        logger.error(`/heart/movie post route error: ${error}`);
    }
});

//remove movie from user's movie list
router.delete("/movie", auth, async (req, res) => {
    const { movieId } = req.body;

    try {
        let movie = await Movie.findOne({ tmdbId: movieId });

        let user = await User.findOne({ email: req.user.email });

        user.movieList = user.movieList.filter(
            (current) => current.toString() !== movie.id
        );

        await user.save();

        res.status(200).json({
            success: true,
            msg: "Movie is removed from the watchlist"
        });
    } catch (error) {
        logger.error(`/heart/movie delete route error: ${error}`);
    }
});

// add show to user's show list
router.post("/show", auth, async (req, res) => {
    const {
        vote_count,
        poster_path,
        id,
        backdrop_path,
        name,
        overview,
        vote_average,
        first_air_date
    } = req.body;

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

        const user = await User.findOne({ email: req.user.email });

        user.showList.unshift(show);

        await user.save();

        res.status(200).json({
            success: true,
            msg: "Show is added to watchlist"
        });
    } catch (error) {
        logger.error(`/heart/show post route error: ${error}`);
    }
});

//remove show from user's show list
router.delete("/show", auth, async (req, res) => {
    const { showId } = req.body;

    try {
        let show = await Show.findOne({ tmdbId: showId });

        let user = await User.findOne({ email: req.user.email });

        user.showList = user.showList.filter(
            (current) => current.toString() !== show.id
        );

        await user.save();

        res.status(200).json({
            success: true,
            msg: "Show is removed from the watchlist"
        });
    } catch (error) {
        logger.error(`/heart/show delete route error: ${error}`);
    }
});

// add person to user's person list
router.post("/person", auth, async (req, res) => {
    const {
        profile_path,
        id,
        name,
        biography,
        birthday,
        known_for_department,
        deathday,
        gender,
        popularity,
        place_of_birth
    } = req.body.details;
    const backgroundUrl = req.body.backgroundPath;

    try {
        let person = await Person.findOne({ tmdbId: id });

        if (!person) {
            person = new Person({
                tmdbId: id,
                name,
                knownForDepartment: known_for_department,
                profilePath: profile_path,
                backdropPath: backgroundUrl,
                biography,
                gender,
                birthday,
                deathday,
                placeOfBirth: place_of_birth,
                popularity
            });
            await person.save();
        } else {
            person.backdropPath = backgroundUrl;
            person.biography = biography;
            person.deathday = deathday;
            person.popularity = popularity;

            await person.save();
        }

        const user = await User.findOne({ email: req.user.email });

        user.personList.unshift(person);

        await user.save();

        res.status(200).json({
            success: true,
            msg: "Person is added to watchlist"
        });
    } catch (error) {
        logger.error(`/heart/person post route error: ${error}`);
    }
});

//remove person from user's person list
router.delete("/person", auth, async (req, res) => {
    const { personId } = req.body;

    try {
        let person = await Person.findOne({ tmdbId: personId });

        let user = await User.findOne({ email: req.user.email });

        user.personList = user.personList.filter(
            (current) => current.toString() !== person.id
        );

        await user.save();

        res.status(200).json({
            success: true,
            msg: "Person is removed from the watchlist"
        });
    } catch (error) {
        logger.error(`/heart/person delete route error: ${error}`);
    }
});

module.exports = router;
