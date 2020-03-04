//import App from "next/app";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "../styles/carouselStyles.css";
import "react-circular-progressbar/dist/styles.css";
import "../styles/modalStyles.css";
import "../styles/paginationStyles.css";
import "../styles/formStyles.css";
import { Provider } from "react-redux";
import store from "../store/store";

function MyApp ({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
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
