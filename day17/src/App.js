import { ChakraProvider, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddUpdateProduct from "./components/AddUpdateProduct";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import TodoContainer from "./components/TodoContainer";
import UnLoggedInHome from "./components/UnLoggedInHome";
import UserSetting from "./components/UserSetting";
import ErrorBoundary from "./ErrorBoundary";

const Products = lazy(() => import("./components/Products"));
const Users = lazy(() => import("./components/Users"));

const App = () => {
	return (
		<Router>
			<ErrorBoundary>
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
								<Route
									path="/products"
									render={() => (
										<Suspense
											fallback={
												<Stack>
													<Skeleton height="20px" />
													<Skeleton height="20px" />
													<Skeleton height="20px" />
												</Stack>
											}
										>
											<Products />
										</Suspense>
									)}
								/>
								<Route
									path="/users"
									render={() => (
										<Suspense
											fallback={
												<Stack>
													<Skeleton height="20px" />
													<Skeleton height="20px" />
													<Skeleton height="20px" />
												</Stack>
											}
										>
											<Users />
										</Suspense>
									)}
								/>
								<Route path="/todos">
									<TodoContainer />
								</Route>
							</Switch>
						</Flex>
						<Footer />
					</Flex>
				</ChakraProvider>
			</ErrorBoundary>
		</Router>
	);
};

export default App;
