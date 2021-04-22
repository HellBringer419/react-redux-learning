import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateLink from "./components/CreateLink";
import Header from "./components/Header";
import LinkList from "./components/LinkList";
import Login from "./components/Login";

const httpLink = createHttpLink({ uri: "http://localhost:4000" });

const authLink = setContext((_, { headers }) => {
    const token =
        document.cookie
            ?.split(";")
            .find((cook) => cook.includes("AUTH_TOKEN"))
            ?.split("=")[1] || null;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const App: FC = () => {
    return (
        <BrowserRouter>
            <ApolloProvider client={apolloClient}>
                <div>
                    <h1> Linker App </h1>
                    <Header />
                    <br /> <hr /> <br />
                    <div>
                        <Switch>
                            <Route path="/" exact>
                                <LinkList />
                            </Route>
                            <Route path="/create">
                                <CreateLink />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </ApolloProvider>
        </BrowserRouter>
    );
};

export default App;
