import Footer from "./Footer";
import Nav from "./Nav";

const UnLoggedInHome = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-fill mt-4">
                <div className="container">
                    <p> welcome </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UnLoggedInHome;
