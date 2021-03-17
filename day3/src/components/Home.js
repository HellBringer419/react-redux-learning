import "../stylesheets/style.css";

// import Carousel from "./Carousel";
import Footer from "./Footer";
import LoginWrapper from "./LoginWrapper";
import Nav from "./Nav";

const Home = (props) => {
    return (
        <div>
            <Nav />
            <div className="body">
                <h4 className="heading"> Login Here </h4>
                <LoginWrapper />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
