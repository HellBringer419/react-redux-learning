import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { FC } from "react";
import LinkList from "./components/LinkList";

const httpLink = createHttpLink({ uri: "http://localhost:4000" });

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

const App: FC = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <div className="App">
                <p> Yo </p>
                <LinkList />
            </div>
        </ApolloProvider>
    );
};

export default App;
