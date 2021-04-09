import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Pagination from "./Pagination";
import UserCard from "./UserCard";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	// constants for pagination
	const PER_PAGE = 3;
	const indexOfLastProductInView = currentPage * PER_PAGE;
	const indexOfFirstProductInView = indexOfLastProductInView - PER_PAGE;

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					`${process.env.REACT_APP_BACKEND_API}/users/`
				);
				setUsers(res.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUsers();
	}, []);

	const handlePaginate = (nextPage) => {
		setCurrentPage(nextPage);
	};

	return (
		<Container py={4}>
			<Text fontSize="md"> Our list of users: </Text>

			{!users ? (
				<Alert status="error">
					<AlertIcon />
					No users
				</Alert>
			) : (
				""
			)}

			<SimpleGrid spacing="40px" minChildWidth="220px" margin={"5"}>
				{loading === true ? (
					<Skeleton>
						<Box
							maxW={"320px"}
							w={"full"}
							bg={"white"}
							boxShadow={"2xl"}
							rounded={"lg"}
							p={6}
							textAlign={"center"}
							d="grid"
							placeItems="center"
						></Box>
					</Skeleton>
				) : (
					users
						.slice(
							indexOfFirstProductInView,
							indexOfLastProductInView
						)
						.map((user) => (
							<UserCard
								key={user._id}
								id={user._id}
								userName={user.userName}
								profilePic={user.profilePic}
								email={user.email}
								firstName={user.firstName}
								lastName={user.lastName}
							/>
						))
				)}

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

			<Pagination
				itemsPerPage={PER_PAGE}
				totalItems={users.length}
				handlePaginate={handlePaginate}
			/>
		</Container>
	);
};

export default Users;
