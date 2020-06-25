const withPlugins = require("next-compose-plugins");
//const withFonts = require("next-fonts");
const optimizedImages = require("next-optimized-images");
// const dev = true;
const nextEnv = require("next-env");
require("dotenv").config();
const dev = process.env.NEXT_STATIC_PRODUCTION !== "production";

const withNextEnv = nextEnv();

module.exports = withPlugins([
    withNextEnv,
    [
        optimizedImages,
        {
            imagesPublicPath: dev
                ? "/_next/static/images/"
                : "https://assets.darklyst.com/images"
        }
    ]
    //withCSS,
    //withFonts
]);
