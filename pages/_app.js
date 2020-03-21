//import App from "next/app";
import { Provider } from "react-redux";
import { useEffect, Fragment } from "react";
import { loadUser } from "../store/actions/authActions";
import store from "../store/store";
import Layout from "../components/layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "../styles/carouselStyles.css";
import "react-circular-progressbar/dist/styles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import setAuthToken from "../utils/setAuthToken";
import { DefaultSeo } from "next-seo";

function MyApp ({ Component, pageProps }) {
	if (typeof localStorage !== "undefined") {
		setAuthToken(localStorage.token);
	}

	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Fragment>
			<DefaultSeo
				openGraph={{
					type: "website",
					locale: "en_US",
					site_name: "Dark Lyst"
				}}
				twitter={{
					cardType: "summary_large_image"
				}}
			/>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</Fragment>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
