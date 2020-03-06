const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	movieList: [
		{
			type: Schema.Types.ObjectId,
			ref: "movie"
		}
	],
	showList: [
		{
			type: Schema.Types.ObjectId,
			ref: "show"
		}
	],
	personList: [
		{
			type: Schema.Types.ObjectId,
			ref: "person"
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model("user", userSchema);

module.exports = User;