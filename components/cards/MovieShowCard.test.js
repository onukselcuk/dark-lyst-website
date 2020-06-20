import { shallow } from "enzyme";
import { MovieShowCard } from "./MovieShowCard";

const propsMovie = {
    cur: {
        backdrop_path: "/o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
        genre_ids: [12, 14, 878, 10751],
        id: 475430,
        media_type: "movie",
        original_language: "en",
        original_title: "Artemis Fowl",
        popularity: 224.04,
        poster_path: "/mhDdx7o7hhrxrikq8aqPLLnS9w8.jpg",
        release_date: "2020-06-12",
        title: "Artemis Fowl",
        vote_average: 6,
        vote_count: 334
    },
    isHero: true,
    isProfile: undefined,
    isShow: undefined,
    movieList: [],
    showList: []
};

const propsShow = {
    cur: {
        backdrop_path: "/fc9ebsTmVCvv6jjD2qT7rWazaej.jpg",
        first_air_date: "2018-06-06",
        genre_ids: [18],
        id: 71146,
        name: "Condor",
        origin_country: ["US"],
        original_language: "en",
        original_name: "Condor",
        popularity: 41.434,
        poster_path: "/28cIK70tN2t4gPTV8CBQZED1H2G.jpg",
        vote_average: 6.5,
        vote_count: 72
    },
    isHero: undefined,
    isProfile: undefined,
    isShow: true,
    movieList: [],
    showList: []
};

describe("When MovieShowCard renders", () => {
    it("expect to render a movie", () => {
        const wrapper = shallow(<MovieShowCard {...propsMovie} />);
        expect(wrapper).toMatchSnapshot();
    });
    it("expect to render a show", () => {
        const wrapper = shallow(<MovieShowCard {...propsShow} />);
        expect(wrapper).toMatchSnapshot();
    });
});
