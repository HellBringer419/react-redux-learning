import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
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

const TopNav = ({ history, currentUser, handleUserLogout }) => {
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
						<RouterLink to="/login">
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
								Login
							</Link>
						</RouterLink>
					)}

					<HStack
						as={"nav"}
						spacing={4}
						display={{ base: "none", md: "flex" }}
					>
						<RouterLink
							to={
								currentUser.id !== 0
									? `/home/${currentUser.id}`
									: "/"
							}
							onClick={onClose}
						>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									// bg: useColorModeValue("gray.200", "gray.700"),
									color: "blue.500",
								}}
								as="div"
							>
								Home
							</Link>
						</RouterLink>
						<RouterLink to="/products" onClick={onClose}>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									// bg: useColorModeValue("gray.200", "gray.700"),
									color: "blue.500",
								}}
								as="div"
							>
								Products
							</Link>
						</RouterLink>

						<RouterLink to="/users" onClick={onClose}>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									// bg: useColorModeValue("gray.200", "gray.700"),
									color: "blue.500",
								}}
								as="div"
							>
								Users
							</Link>
						</RouterLink>

						<RouterLink to="/todos" onClick={onClose}>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									// bg: useColorModeValue("gray.200", "gray.700"),
									color: "blue.500",
								}}
								as="div"
							>
								Todos
							</Link>
						</RouterLink>
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
						<RouterLink
							to={
								currentUser.id !== 0
									? `/home/${currentUser.id}`
									: "/"
							}
							onClick={onClose}
						>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									// bg: useColorModeValue("gray.200", "gray.700"),
									color: "blue.500",
								}}
								as="div"
							>
								Home
							</Link>
						</RouterLink>
						<RouterLink to="/products" onClick={onClose}>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									// bg: useColorModeValue("gray.200", "gray.700"),
									color: "blue.500",
								}}
								as="div"
							>
								Products
							</Link>
						</RouterLink>

						<RouterLink to="/users" onClick={onClose}>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									// bg: useColorModeValue("gray.200", "gray.700"),
									color: "blue.500",
								}}
								as="div"
							>
								Users
							</Link>
						</RouterLink>

						<RouterLink to="/todos" onClick={onClose}>
							<Link
								px={2}
								py={1}
								rounded={"md"}
								_hover={{
									textDecoration: "none",
									// bg: useColorModeValue("gray.200", "gray.700"),
									color: "blue.500",
								}}
								as="div"
							>
								Todos
							</Link>
						</RouterLink>
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};

const SideNav = ({ history, currentUser, handleUserLogout }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleCreate = () => {
		onClose();
		history.push("/update/user/0");
	};

	const handleSettings = () => {
		onClose();
		history.push(`/update/user/${currentUser.id}`);
	};

	const handleLogout = () => {
		onClose();
		handleUserLogout();
		history.push("/");
	};

	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
			<IconButton
				size={"md"}
				icon={<HamburgerIcon />}
				aria-label={"Open Menu"}
				onClick={onOpen}
			/>

			<Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader borderBottomWidth="1px">
							{currentUser.id !== 0 ? (
								<Menu>
									<MenuButton
										as={Button}
										rounded={"full"}
										variant={"link"}
										cursor={"pointer"}
									>
										<HStack
											spacing={2}
											alignItems={"center"}
										>
											<Avatar
												size={"sm"}
												src={
													process.env
														.REACT_APP_BACKEND_API +
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
										<MenuItem onClick={handleCreate}>
											Create New User
										</MenuItem>
										<MenuItem onClick={handleSettings}>
											Your Settings
										</MenuItem>
										<MenuDivider />
										<MenuItem onClick={handleLogout}>
											Log Out
										</MenuItem>
									</MenuList>
								</Menu>
							) : (
								<RouterLink to="/login">
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
										Login
									</Link>
								</RouterLink>
							)}
						</DrawerHeader>
						<DrawerBody>
							<RouterLink
								to={
									currentUser.id !== 0
										? `/home/${currentUser.id}`
										: "/"
								}
								onClick={onClose}
							>
								<Link
									px={2}
									py={1}
									rounded={"md"}
									_hover={{
										textDecoration: "none",
										// bg: useColorModeValue("gray.200", "gray.700"),
										color: "blue.500",
									}}
									as="div"
								>
									Home
								</Link>
							</RouterLink>
							<RouterLink to="/products" onClick={onClose}>
								<Link
									px={2}
									py={1}
									rounded={"md"}
									_hover={{
										textDecoration: "none",
										// bg: useColorModeValue("gray.200", "gray.700"),
										color: "blue.500",
									}}
									as="div"
								>
									Products
								</Link>
							</RouterLink>

							<RouterLink to="/users" onClick={onClose}>
								<Link
									px={2}
									py={1}
									rounded={"md"}
									_hover={{
										textDecoration: "none",
										// bg: useColorModeValue("gray.200", "gray.700"),
										color: "blue.500",
									}}
									as="div"
								>
									Users
								</Link>
							</RouterLink>

							<RouterLink to="/todos" onClick={onClose}>
								<Link
									px={2}
									py={1}
									rounded={"md"}
									_hover={{
										textDecoration: "none",
										// bg: useColorModeValue("gray.200", "gray.700"),
										color: "blue.500",
									}}
									as="div"
								>
									Todos
								</Link>
							</RouterLink>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(TopNav));
