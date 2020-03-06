const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const showSchema = new Schema({
	tmdbId: {
		type: String
	},
	name: {
		type: String
	},
	overview: {
		type: String
	},
	firstAirDate: {
		type: String
	},
	posterPath: {
		type: String
	},
	backdropPath: {
		type: String
	},
	voteAverage: {
		type: Number
	},
	voteCount: {
		type: Number
	}
});

const Show = mongoose.model("show", showSchema);

module.exports = Show;
