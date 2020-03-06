const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
	tmdbId: {
		type: Number
	},
	title: {
		type: String
	},
	posterPath: {
		type: String
	},
	voteAverage: {
		type: Number
	},
	overview: {
		type: String
	},
	releaseDate: {
		type: String
	},
	backdropPath: {
		type: String
	},
	voteCount: {
		type: Number
	}
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
