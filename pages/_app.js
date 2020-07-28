import Head from "next/head";
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

function MyApp({ Component, pageProps }) {
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
                    site_name: "DarkLyst",
                    url: "https://darklyst.com",
                    images: [
                        {
                            url: require("../public/images/darklyst-logo.png"),
                            width: 300,
                            height: 300,
                            alt: "Darklyst Logo"
                        }
                    ]
                }}
                twitter={{
                    cardType: "summary_large_image"
                }}
            />
            <Head>
                {/* <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                        key="viewport"
                    /> */}
            </Head>
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
