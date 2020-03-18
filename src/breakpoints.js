export default {
	up (size) {
		const sizes = {
			fullhd: "120em" //1920px
		};
		return `@media (min-width:${sizes[size]})`;
	},
	down (size) {
		const sizes = {
			xvsm: "21.250em", //340px
			xxxs: "26.875em", //430px
			xxs: "31.25em", //500px
			xs: "36em", // 576px
			sm: "46.875em", // 750px
			mdsm: "59.375em", // 950px
			md: "68.75em", //1100px
			lg: "82.5em", //1320px
			xl: "93.75em" //1500px
		};
		return `@media (max-width:${sizes[size]})`;
	},
	sizes: {
		xvsm: "21.250em", //340px
		xxxs: "26.875em", //430px
		xxs: "31.25em", //500px
		xs: "36em", // 576px
		sm: "46.875em", // 750px
		mdsm: "59.375em", // 950px
		md: "68.75em", //1100px
		lg: "82.5em", //1320px
		xl: "93.75em", //1500px
		fullhd: "120em" //1920px
	}
};
