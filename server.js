require("dotenv").config();
const express = require("express");
const path = require("path");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const helmet = require("helmet");
const moviesRoutes = require("./routes/api/moviesRoutes");
const showsRoutes = require("./routes/api/showsRoutes");
const movieRoutes = require("./routes/api/movieRoutes");
const showRoutes = require("./routes/api/showRoutes");
const personRoutes = require("./routes/api/personRoutes");
const searchRoutes = require("./routes/api/searchRoutes");
const discoverRoutes = require("./routes/api/discoverRoutes");
const authRoutes = require("./routes/api/authRoutes");
const heartRoutes = require("./routes/api/heartRoutes");
const connectDB = require("./config/db");

connectDB();

app.prepare().then(() => {
    const server = express();
    server.use(helmet());
    server.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    "https://www.youtube.com",
                    "https://s.ytimg.com",
                    "https://www.google.com",
                    "https://www.gstatic.com"
                ],
                childSrc: [
                    "'self'",
                    "https://www.youtube.com",
                    "https://www.google.com"
                ],
                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com"
                ],
                imgSrc: [
                    "'self'",
                    "https://image.tmdb.org",
                    "https://i.ytimg.com",
                    "https://s.gravatar.com"
                ],
                fontSrc: [
                    "'self'",
                    "https://fonts.googleapis.com",
                    "https://fonts.gstatic.com"
                ]
            }
        })
    );
    server.use(express.json());
    server.use("/api/shows", showsRoutes);
    server.use("/api/movies", moviesRoutes);
    server.use("/api/movie", movieRoutes);
    server.use("/api/show", showRoutes);
    server.use("/api/person", personRoutes);
    server.use("/api/search", searchRoutes);
    server.use("/api/discover", discoverRoutes);
    server.use("/api/auth", authRoutes);
    server.use("/api/heart", heartRoutes);

    //* set Cache-Control Headers for static files only if they are under static folder

    if (process.env.NODE_ENV === "production") {
        server.get(
            /^\/_next\/static\/(images|fonts)\//,
            (_, res, nextHandler) => {
                res.setHeader(
                    "Cache-Control",
                    "public, max-age=31536000, immutable"
                );
                nextHandler();
            }
        );
    }

    /**Service Worker file redirect */

    server.get("/service-worker.js", (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname,
                `${process.env.NODE_ENV === "production" ? "_" : "."}next`,
                "static",
                "service-worker.js"
            )
        );
    });

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Now serving on localhost:${PORT}`);
    });
});
