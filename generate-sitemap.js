const sitemap = require("nextjs-sitemap-generator");

sitemap({
    baseUrl: "https://darklyst.com",
    pagesDirectory: __dirname + "/pages",
    targetDirectory: __dirname + "/.next/static",
    nextConfigPath: __dirname + "/sitemap.config.js",
    ignoredExtensions: ["png", "jpg"]
});
