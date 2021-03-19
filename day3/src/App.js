import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const toggleLoginState = () => {
        setLoggedIn(!loggedIn);
    };

    return (
        <Router>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={(props) => (
                        <Login {...props} toggleLoginState={toggleLoginState} />
                    )}
                />
                <Route
                    path="/home/:user"
                    render={(props) => (
                        <Home {...props} toggleLoginState={toggleLoginState} />
                    )}
                />
            </Switch>
        </Router>
    );
};

export default App;
