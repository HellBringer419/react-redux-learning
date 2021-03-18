import { useParams } from "react-router";
import "../stylesheets/style.css";

import Carousel from "./Carousel";
import Footer from "./Footer";
import Nav from "./Nav";

const Home = ({ history, toggleLoginState }) => {
    const user = useParams();

    return (
        <div>
            <Nav history={history} toggleLoginState={toggleLoginState} />
            <div className="body">
                <h4 className="heading"> Welcome {user.user} </h4>
                <Carousel />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
