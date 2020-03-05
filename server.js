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
const personRoutes = require("./routes/api/personRoutes");
const searchRoutes = require("./routes/api/searchRoutes");
const discoverRoutes = require("./routes/api/discoverRoutes");
const authRoutes = require("./routes/api/authRoutes");
const connectDB = require("./config/db");

connectDB();

app.prepare().then(() => {
	const server = express();
	server.use(express.json({ extended: false }));
	server.use("/api/shows", showsRoutes);
	server.use("/api/movies", moviesRoutes);
	server.use("/api/movie", movieRoutes);
	server.use("/api/show", showRoutes);
	server.use("/api/person", personRoutes);
	server.use("/api/search", searchRoutes);
	server.use("/api/discover", discoverRoutes);
	server.use("/api/auth", authRoutes);

	server.get("*", (req, res) => {
		return handle(req, res);
	});

	const PORT = process.env.PORT || 3000;

	server.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Now serving on localhost:${PORT}`);
	});
});
