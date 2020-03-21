import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../src/theme";

class MyDocument extends Document {
	static async getInitialProps (ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render () {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" sizes="192x192" href="/favicon/apple-touch-icon.png" />
					<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
					<link rel="icon" sizes="32x32" type="image/png" href="/favicon/favicon.png" />
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
						key="viewport"
					/>
					{/* PWA primary color */}
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" />
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
