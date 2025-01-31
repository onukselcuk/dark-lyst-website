import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../src/theme";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href={require("../public/favicons/apple-touch-icon.png")}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href={require("../public/favicons/favicon-32x32.png")}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href={require("../public/favicons/favicon-16x16.png")}
                    />
                    <link rel="manifest" href="/favicons/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href={require("../public/favicons/safari-pinned-tab.svg")}
                        color={theme.palette.primary.main}
                    />
                    <link rel="shortcut icon" href="/favicons/favicon.ico" />
                    <meta
                        name="msapplication-TileColor"
                        content={theme.palette.primary.main}
                    />
                    <meta
                        name="msapplication-config"
                        content="/favicons/browserconfig.xml"
                    />
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        rel="preconnect"
                        href="https://image.tmdb.org"
                        crossOrigin="true"
                    />
                    <link
                        rel="preconnect"
                        href="https://i.ytimg.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                    {/* Global site tag (gtag.js) - Google Analytics */}
                    {process.env.NEXT_STATIC_PRODUCTION === "production" && (
                        <script
                            async
                            src="https://www.googletagmanager.com/gtag/js?id=UA-171026859-1"
                        />
                    )}
                    {process.env.NEXT_STATIC_PRODUCTION === "production" && (
                        <script src="/scripts/googleAnalytics.js" />
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
