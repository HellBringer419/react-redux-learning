import '../stylesheets/style.css';
import Carousel from './Carousel';

import Footer from "./Footer";
import Nav from "./Nav";

const Home = (props) => {
    return (
        <div>
            <Nav />
            <div className="body">
        <h4 className="heading"> Carousel </h4>
            <Carousel />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
