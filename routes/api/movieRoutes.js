const express = require("express");
const router = express.Router();
const axios = require("axios");
// const seedMovieDetail = require("../../src/seedMovieDetail");

// * get details of a particular movie
router.get("/detail/:id", async (req, res) => {
    const url = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images`;
    let data = {};
    await axios
        .get(url)
        .then((result) => {
            data = result.data;
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });

    //res.json(seedMovieDetail);
});

// * get credits of a particular movie
router.get("/credits/:id", async (req, res) => {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.TMDB_API_KEY}`;
    await axios
        .get(creditsUrl)
        .then((creditsResult) => {
            res.send(creditsResult.data);
        })
        .catch((err) => {
            console.log(err);
        });
    //res.json(seedMovieDetail);
});

// * get recommendations given a movie
router.get("/recommendations/:id", async (req, res) => {
    const recommendationsUrl = `https://api.themoviedb.org/3/movie/${req.params.id}/recommendations?api_key=${process.env.TMDB_API_KEY}`;
    await axios
        .get(recommendationsUrl)
        .then((recommended) => {
            res.send(recommended.data);
        })
        .catch((err) => {
            console.log(err);
        });
    //res.json(seedMovieDetail);
});

// * discover movies for genres
router.get("/discover/:genreId", async (req, res) => {
    const movieDiscoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${req.params.genreId}&include_adult=false`;
    await axios
        .get(movieDiscoverUrl)
        .then((moviesDiscovered) => {
            res.send(moviesDiscovered.data);
        })
        .catch((err) => {
            console.log(err);
        });
    //res.json(seedMovieDetail);
});

module.exports = router;
