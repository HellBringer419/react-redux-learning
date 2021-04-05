import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";

import Footer from "./Footer";
import Nav from "./Nav";

const Home = ({ history }) => {
    const [currentUser] = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (currentUser === null) history.push("/");
        else {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`
                )
                .then((res) => setUser(res.data))
                .catch((error) => console.error(error));
        }
    }, [currentUser]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-fill mt-4">
                <div className="container">
                    <h4 className="mt-5 text-bold"> Your Image Carousel </h4>
                    {user ? (
                        <p className="lead"> Welcome {user.userName} </p>
                    ) : (
                        ""
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
