module.exports = {
    exportPathMap: function () {
        return {
            "": { page: "/" },
            "/movie/detail/artemis-fowl/475430": {
                page: "/movie/detail/[title]/[pid]"
            },
            "/show/detail/dark/70523": { page: "/show/detail/[title]/[tid]" },
            "/person/detail/keanu-reeves/6384": {
                page: "/person/detail/[name]/[sid]"
            },
            "/movies/now-playing": { page: "/movies/[slug]" },
            "/movies/popular": { page: "/movies/[slug]" },
            "/movies/top-rated": { page: "/movies/[slug]" },
            "/movies/upcoming": { page: "/movies/[slug]" },
            "/shows/on-the-air": { page: "/shows/[slug]" },
            "/shows/popular": { page: "/shows/[slug]" },
            "/shows/top-rated": { page: "/shows/[slug]" },
            "/shows/latest-on-netflix": { page: "/shows/[slug]" },
            "/shows/latest-on-apple-tv-plus": { page: "/shows/[slug]" },
            "/discover/movies": { page: "/discover/movies" },
            "/discover/shows": { page: "/discover/shows" }
        };
    }
};
