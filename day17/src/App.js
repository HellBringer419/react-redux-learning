import { ChakraProvider, Flex } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddUpdateProduct from "./components/AddUpdateProduct";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
// import Products from "./components/Products";
import UnLoggedInHome from "./components/UnLoggedInHome";
import Users from "./components/Users";
import UserSetting from "./components/UserSetting";
import { UserProvider } from "./utils/UserContext";

const Products = lazy(() => import("./components/Products"));

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
									path="/update/user/:user"
									render={(props) => (
										<UserSetting {...props} />
									)}
								/>
								<Route
									path="/update/product/:id"
									render={(props) => (
										<AddUpdateProduct {...props} />
									)}
								/>
								<Route path="/products" render={() => <Suspense fallback={<div> loading ... </div>} > <Products /> </Suspense>} />
								{/* <Route path="/products">
									<Products />
								</Route> */}
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
