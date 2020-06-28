import { NextSeo } from "next-seo";

const ErrorPage = () => {
    return (
        <main>
            <NextSeo
                title="Error 404"
                noindex={true}
                openGraph={{
                    url: "https://www.darklyst.com/error",
                    title: "Error 404"
                }}
            />
            <section className="top-section">
                <img
                    className="error-image"
                    src={require("../public/images/error-image.jpg")}
                    alt="Error Image"
                />
            </section>
            <style jsx>{`
                .top-section {
                    width: 100%;
                }
                .error-image {
                    width: 100%;
                    margin-bottom: -2rem;
                }
            `}</style>
        </main>
    );
};

export default ErrorPage;
