import { useContext } from "react";
import { useParams } from "react-router";
import { UserContext } from "../utils/UserContext";

import Carousel from "./Carousel";
import Footer from "./Footer";
import Nav from "./Nav";

const Home = ({ history, toggleLoginState }) => {
    const [currentUser] = useContext(UserContext);
    return (
        <div className="d-flex flex-column min-vh-100">
            <Nav history={history} toggleLoginState={toggleLoginState} />
            <main className="flex-fill mt-4">
                <div className="container">
                    <h4 className="mt-5 text-bold"> Your Image Carousel </h4>
                    <p className="lead"> Welcome {currentUser.name} </p>
                <Carousel />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
