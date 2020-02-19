import Navbar from "./Navbar";
import { Fragment } from "react";
import theme from "../src/theme";

const Layout = (props) => {
	return (
		<Fragment>
			<Navbar />
			{props.children}
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
			`}</style>
		</Fragment>
	);
};

export default Layout;
