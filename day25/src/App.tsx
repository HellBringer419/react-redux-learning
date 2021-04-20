import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import { FC } from "react";

const httpLink: ApolloLink = createHttpLink({ uri: "http://localhost:4000" });

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

const App: FC = () => {
	return (
		<ApolloProvider client={apolloClient}>
			<div className="App">
				<p> Yo </p>
			</div>
		</ApolloProvider>
	);
};

export default App;
