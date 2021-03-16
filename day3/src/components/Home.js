import '../stylesheets/style.css';

import Footer from "./Footer";
import Main from "./Main";
import Nav from "./Nav";

const Home = (props) => {
    return (
        <div>
            <Nav />
            <Main />
            <Footer />
        </div>
    );
};

export default Home;
