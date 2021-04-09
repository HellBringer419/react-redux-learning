import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserCard from "./UserCard";

const Users = () => {
	const [users, setUsers] = useState([]);
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		// setLoading(true);
		axios
			.get(`${process.env.REACT_APP_BACKEND_API}/users/`)
			.then((res) => setUsers(res.data))
			// .then(setLoading(false))
			.catch((error) => console.error(error));
	}, []);

	// TODO: width resp

	return (
		<Container py={4}>
			<Text fontSize="md"> Our list of users: </Text>
			<SimpleGrid spacing="40px" minChildWidth="220px">
				{users.map((user) => (
					<UserCard
						key={user._id}
						id={user._id}
						userName={user.userName}
						profilePic={user.profilePic}
						email={user.email}
						firstName={user.firstName}
						lastName={user.lastName}
					/>
				))}

				<Box
					maxW={"320px"}
					w={"full"}
					bg={useColorModeValue("white", "gray.900")}
					boxShadow={"2xl"}
					rounded={"lg"}
					p={6}
					textAlign={"center"}
					d="grid"
					placeItems="center"
				>
					<RouterLink to="/update/user/0">
						<AddIcon w="10" h="10" />
					</RouterLink>
				</Box>
			</SimpleGrid>
		</Container>
	);
};

export default Users;

// {loading
//                 ? "HI"
//                 :
