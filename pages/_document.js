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
                        href="/favicons/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicons/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicons/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/favicons/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/favicons/safari-pinned-tab.svg"
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
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                        key="viewport"
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
