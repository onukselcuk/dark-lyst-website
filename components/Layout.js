import Navbar from "./Navbar";
import { Fragment } from "react";
import theme from "../src/theme";
import Footer from "./Footer";

const Layout = (props) => {
	return (
		<Fragment>
			<Navbar />
			<div className="root">{props.children}</div>
			<Footer />
			<style jsx>{`
				:global(html) {
					font-size: 62.5%;
					scroll-behavior: smooth;
					box-sizing: border-box;
				}

				:global(html) *,
				:global(html) *::before,
				:global(html) *::after {
					box-sizing: inherit;
					margin: 0;
					padding: 0;
					font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
				}

				:global(body) {
					color: white;
					background-color: ${theme.palette.primary.main};
					font-size: 1.6rem;
				}

				:global(#__next) {
					width: 100%;
				}

				.root {
					min-height: calc(100vh - 180px);
				}
			`}</style>
		</Fragment>
	);
};

export default Layout;
