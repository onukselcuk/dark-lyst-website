require("dotenv").config();
const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const moviesRoutes = require("./routes/api/moviesRoutes");
const showsRoutes = require("./routes/api/showsRoutes");
const movieRoutes = require("./routes/api/movieRoutes");
const showRoutes = require("./routes/api/showRoutes");

app.prepare().then(() => {
	const server = express();
	server.use("/api/shows", showsRoutes);
	server.use("/api/movies", moviesRoutes);
	server.use("/api/movie", movieRoutes);
	server.use("/api/show", showRoutes);

	server.get("*", (req, res) => {
		return handle(req, res);
	});

	const PORT = process.env.PORT || 3000;

	server.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Now serving on localhost:${PORT}`);
	});
});
