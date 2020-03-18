import Carousel from "react-multi-carousel";
import { useRef, useEffect } from "react";

const responsiveSmall = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 6,
		slidesToSlide: 6, // optional, default to 1.
		partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
	},
	medium: {
		breakpoint: { max: 1024, min: 750 },
		items: 4,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
	},
	tablet: {
		breakpoint: { max: 750, min: 464 },
		items: 3,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 2,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
	}
};

const responsiveLarge = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
		partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
		partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
	}
};

const responsiveHero = {
	all: {
		breakpoint: { max: 3000, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
	}
};

const CarouselContainer = (props) => {
	const { children, isSmall, deviceType, isHero } = props;

	const CarouselRef = useRef(null);

	useEffect(
		() => {
			if (CarouselRef && CarouselRef.current) {
				CarouselRef.current.goToSlide(0, true);
			}
		},
		[ children ]
	);

	return (
		<Carousel
			swipeable={true}
			draggable={false}
			showDots={false}
			responsive={isSmall ? responsiveSmall : isHero ? responsiveHero : responsiveLarge}
			ssr={true} // means to render carousel on server-side.
			infinite={false}
			// autoPlay={props.deviceType !== "mobile" ? true : false}
			autoPlay={false}
			autoPlaySpeed={20000}
			keyBoardControl={true}
			customTransition="all 400ms ease-out"
			transitionDuration={400}
			containerClass="carousel-container"
			removeArrowOnDeviceType={[ "tablet", "mobile" ]}
			deviceType={deviceType}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
			ref={CarouselRef}
		>
			{children}
		</Carousel>
	);
};

export default CarouselContainer;
