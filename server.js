require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
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
const path = require("path");
const rfs = require("rotating-file-stream");
const accessLogStream = rfs.createStream("access.log", {
    interval: "10d",
    path: path.join(__dirname, "logs", "morgan-logs")
});

/** Winston Logger */
const { logger } = require("./config/logger");

/** Connect to MongoDB */
connectDB();

/** Generate Sitemap */
const sitemap = require("nextjs-sitemap-generator");
if (!dev) {
    sitemap({
        baseUrl: "https://darklyst.com",
        pagesDirectory: __dirname + "/pages",
        targetDirectory: __dirname + "/.next/static",
        nextConfigPath: __dirname + "/sitemap.config.js",
        ignoredExtensions: ["png", "jpg"]
    });
}

const sitemapOptions = {
    root: __dirname + "/.next/static/",
    headers: {
        "Content-Type": "text/xml;charset=UTF-8"
    }
};

app.prepare().then(() => {
    const server = express();
    server.use(
        morgan(`${dev ? "dev" : "combined"}`, { stream: accessLogStream })
    );
    server.use(helmet());
    server.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: [
                    "'self'",
                    "https://www.youtube.com",
                    "https://s.ytimg.com",
                    "https://www.google.com",
                    "https://www.gstatic.com",
                    "https://www.youtube.com",
                    "https://www.google.com",
                    "https://fonts.googleapis.com",
                    "https://image.tmdb.org",
                    "https://i.ytimg.com",
                    "https://s.gravatar.com",
                    "https://fonts.googleapis.com",
                    "https://fonts.gstatic.com",
                    "https://apis.google.com"
                ],
                scriptSrc: [
                    "'self'",
                    "https://www.youtube.com",
                    "https://s.ytimg.com",
                    "https://www.google.com",
                    "https://www.gstatic.com",
                    "https://apis.google.com",
                    "https://www.googletagmanager.com",
                    "https://www.google-analytics.com"
                ],
                childSrc: [
                    "'self'",
                    "https://www.youtube.com",
                    "https://www.google.com",
                    "https://accounts.google.com"
                ],
                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com"
                ],
                imgSrc: [
                    "'self'",
                    "data:",
                    "https://image.tmdb.org",
                    "https://i.ytimg.com",
                    "https://s.gravatar.com",
                    "https://lh5.googleusercontent.com",
                    "https://www.google-analytics.com",
                    "https://assets.darklyst.com"
                ],
                fontSrc: [
                    "'self'",
                    "data:",
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

    server.get("/sitemap.xml", (req, res) => {
        res.status(200).sendFile("sitemap.xml", sitemapOptions);
    });

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, (err) => {
        if (err) throw err;
        logger.log("info", `Now serving on localhost:${PORT}`);
    });
});
