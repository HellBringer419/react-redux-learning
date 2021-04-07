import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import UnLoggedInHome from "./components/UnLoggedInHome";
import UserSetting from "./components/UserSetting";
import Products from "./components/Products";
import Users from "./components/Users";

import { UserProvider } from "./utils/UserContext";
import Nav from "./components/Nav";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Footer from "./components/Footer";

const App = () => {
    return (
        <Router>
            <UserProvider>
                <ChakraProvider>
                    <Flex minH={"100vh"} flexFlow="column">
                        <Nav />

                        <Flex flexGrow="1" minW={"100%"}>
                            <Switch>
                                <Route
                                    path="/"
                                    exact
                                    render={(props) => (
                                        <UnLoggedInHome {...props} />
                                    )}
                                />
                                <Route
                                    path="/login"
                                    render={(props) => <Login {...props} />}
                                />
                                <Route
                                    path="/home/:user"
                                    render={(props) => <Home {...props} />}
                                />
                                <Route
                                    path="/update/:user"
                                    render={(props) => (
                                        <UserSetting {...props} />
                                    )}
                                />
                                <Route path="/products">
                                    <Products />
                                </Route>
                                <Route path="/users">
                                    <Users />
                                </Route>
                            </Switch>
                        </Flex>
                        <Footer />
                    </Flex>
                </ChakraProvider>
            </UserProvider>
        </Router>
    );
};

export default App;
