const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
	name: {
		type: String
	},
	tmdbId: {
		type: Number
	},
	birthday: {
		type: String
	},
	knownForDepartment: {
		type: String
	},
	deathday: {
		type: String
	},
	gender: {
		type: Number
	},
	biography: {
		type: String
	},
	placeOfBirth: {
		type: String
	},
	profilePath: {
		type: String
	},
	popularity: {
		type: Number
	},
	backdropPath: {
		type: String
	}
});

const Person = mongoose.model("person", personSchema);

module.exports = Person;
