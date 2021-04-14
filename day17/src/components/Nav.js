import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { ACTIONS } from "../store/reducer";

const Nav = ({ history, currentUser, handleUserLogout }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSettings = () => {
		history.push(`/update/user/${currentUser.id}`);
	};

	const handleLogout = () => {
		handleUserLogout();
		history.push("/");
	};

	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<IconButton
					size={"md"}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={"Open Menu"}
					display={{ md: !isOpen ? "none" : "inherit" }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={"center"}>
					{currentUser.id !== 0 ? (
						<Menu>
							<MenuButton
								as={Button}
								rounded={"full"}
								variant={"link"}
								cursor={"pointer"}
							>
								<HStack spacing={2} alignItems={"center"}>
									<Avatar
										size={"sm"}
										src={
											process.env.REACT_APP_BACKEND_API +
											"/" +
											(currentUser.profilePic
												? currentUser.profilePic
												: "images/default.jpg")
										}
									/>
									<p> {currentUser.userName} </p>
								</HStack>
							</MenuButton>
							<MenuList>
								<MenuItem onClick={handleSettings}>
									Settings
								</MenuItem>
								<MenuDivider />
								<MenuItem onClick={handleLogout}>
									Log Out
								</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<Link
							px={2}
							py={1}
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								// bg: useColorModeValue("gray.200", "gray.700"),
								bg: "gray.200",
							}}
							as="div"
						>
							<RouterLink to="/login"> Login </RouterLink>
						</Link>
					)}

					<HStack
						as={"nav"}
						spacing={4}
						display={{ base: "none", md: "flex" }}
					>
						<Link
							px={2}
							py={1}
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								// bg: useColorModeValue("gray.200", "gray.700"),
								bg: "gray.200",
							}}
							as="div"
						>
							<RouterLink
								to={
									currentUser.id !== 0
										? `/home/${currentUser.id}`
										: "/"
								}
							>
								Home
							</RouterLink>
						</Link>
						<Link
							px={2}
							py={1}
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								// bg: useColorModeValue("gray.200", "gray.700"),
								bg: "gray.200",
							}}
							as="div"
						>
							<RouterLink to="/products"> Products </RouterLink>
						</Link>
						<Link
							px={2}
							py={1}
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								// bg: useColorModeValue("gray.200", "gray.700"),
								bg: "gray.200",
							}}
							as="div"
						>
							<RouterLink to="/users"> Users </RouterLink>
						</Link>
					</HStack>
				</HStack>
				<Flex alignItems={"center"}>
					<Box>
						<RouterLink
							to={
								currentUser.id !== 0
									? `/home/${currentUser.id}`
									: "/"
							}
						>
							<HStack spacing={2} alignItems={"center"}>
								<img
									src="https://s2.svgbox.net/hero-solid.svg?ic=camera&color=CAD8E7"
									width="32"
									height="32"
									alt="Logo"
								/>
								<p>Brand</p>
							</HStack>
						</RouterLink>
					</Box>
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4}>
					<Stack as={"nav"} spacing={4}>
						<Link
							px={2}
							py={1}
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								// bg: useColorModeValue("gray.200", "gray.700"),
								bg: "gray.200",
							}}
							as="div"
						>
							<RouterLink
								to={
									currentUser.id !== 0
										? `/home/${currentUser.id}`
										: "/"
								}
							>
								Home
							</RouterLink>
						</Link>
						<Link
							px={2}
							py={1}
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								// bg: useColorModeValue("gray.200", "gray.700"),
								bg: "gray.200",
							}}
							as="div"
						>
							<RouterLink to="/products"> Products </RouterLink>
						</Link>
						<Link
							px={2}
							py={1}
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								// bg: useColorModeValue("gray.200", "gray.700"),
								bg: "gray.200",
							}}
							as="div"
						>
							<RouterLink to="/users"> Users </RouterLink>
						</Link>
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleUserLogout: () => dispatch({ type: ACTIONS.LOGOUT }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
