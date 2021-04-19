import { Button } from "@chakra-ui/button";
import { Container, HStack, Stack, Text } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";

const UnLoggedInHome = () => {
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
					We can show you our awesome{" "}
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

export default UnLoggedInHome;
