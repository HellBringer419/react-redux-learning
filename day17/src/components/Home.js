import { Button } from "@chakra-ui/button";
import { Container, HStack, Stack, Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const Home = ({ history, currentUser }) => {
	useEffect(() => {
		if (currentUser.id === 0) history.push("/");
	}, [currentUser, history]);

	return (
		<Container py={4}>
			<Stack spacing="8">
				<Text fontSize="5xl" as="span">
					Welcome To{" "}
					<Text fontSize="6xl" display="inline">
						Brand
					</Text>
				</Text>
				<Text fontSize="md" as="span">
					{currentUser.id !== 0
						? `Welcome ${currentUser.userName}, we `
						: "We "}
					can show you our awesome{" "}
					<Text as="b" display="inline">
						products{" "}
					</Text>
					OR Get to know our huge list of{" "}
					<Text as="b" display="inline">
						users
					</Text>
					.
				</Text>
				<HStack justifyContent={"space-around"}>
					<RouterLink to="/products">
						<Button bg={"gray.200"}>Products</Button>
					</RouterLink>
					<RouterLink to="/users">
						<Button>Users</Button>
					</RouterLink>
				</HStack>
			</Stack>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
	};
};

export default connect(mapStateToProps)(Home);
