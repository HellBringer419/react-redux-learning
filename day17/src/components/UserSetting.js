import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import {
	Box,
	Container,
	Heading,
	HStack,
	Stack,
	Text,
} from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { ACTIONS } from "../store/reducer";

const UserSetting = ({
	history,
	currentUser,
	handleUserLogout,
	handleUserLogin,
}) => {
	const [email, setEmail] = useState(currentUser.email || "");
	const [password, setPassword] = useState("");
	const [pic, setPic] = useState(currentUser.profilePic || "");
	const [firstName, setFirstName] = useState(currentUser.firstName || "");
	const [lastName, setLastName] = useState(currentUser.lastName || "");
	const [userName, setUserName] = useState(currentUser.userName || "");
	const [errors, setErrors] = useState({
		email: false,
		password: false,
		pic: false,
		firstName: false,
		lastName: false,
		userName: false,
	});
	const [authorized, setAuthorized] = useState(true);
	const [updated, setUpdated] = useState(false);

	const [fileName, setFileName] = useState("");
	const fileInput = useRef();

	const id = Number(useParams().user);

	useEffect(() => {
		if (currentUser.id === 0) {
			if (id !== 0) {
				history.push("/");
			} else console.log("CREATE user mode");
		}
	}, [currentUser, history, id]);

	const handleDelete = (event) => {
		event.preventDefault();
		axios
			.delete(`${process.env.REACT_APP_BACKEND_API}/users/${id}`, {
				headers: {
					Authorization: `Basic ${currentUser.token}`,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					handleUserLogout();
					history.push("/");
				} else {
					console.log(res.status);
				}
			})
			.catch((error) => {
				console.error(error);

				setAuthorized(false);
			});
	};

	const handleUpload = (event) => {
		event.preventDefault();
		if (fileInput.current.files[0] === undefined) {
			setErrors({ ...errors, pic: false });
		} else {
			let formData = new FormData();
			formData.append("image", fileInput.current.files[0]);
			axios
				.post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					setPic(res.data.path);
				})
				.catch((error) => console.error(error));
		}
	};

	const validateUserName = () => {
		if (userName === "") {
			setErrors({ ...errors, userName: true });
			return false;
		} else {
			setErrors({ ...errors, userName: false });
			return true;
		}
	};

	const validateEmail = () => {
		const emailRE = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

		if (email === "" || !emailRE.test(String(email).toLowerCase())) {
			setErrors({ ...errors, email: true });
			return false;
		} else {
			setErrors({ ...errors, email: false });
			return true;
		}
	};

	const validatePassword = () => {
		const alphaNumericRE = /^[a-z0-9]+$/i;
		if (
			password === "" ||
			password.length < 5 ||
			!alphaNumericRE.test(String(password).toLowerCase())
		) {
			setErrors({ ...errors, password: true });
			return false;
		} else {
			setErrors({ ...errors, password: false });
			return true;
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// TODO: add confirm passw modal
		// made a slight change to put request ... do check

		if (validateUserName() && validateEmail() && validatePassword()) {
			const payload = {
				userName: userName,
				profilePic: pic,
				email: email,
				password: password,
				firstName: firstName,
				lastName: lastName,
			};

			if (id === 0) {
				axios
					.post(
						`${process.env.REACT_APP_BACKEND_API}/auth/signup`,
						payload
					)
					.then((res) => {
						if (res.status === 201) {
							setUpdated(true);
							handleUserLogout();
							history.push("/login");
						}
					})
					.catch((error) => console.error(error));
			} else {
				axios
					.put(
						`${process.env.REACT_APP_BACKEND_API}/users/${id}`,
						payload,
						{
							headers: {
								Authorization: `Basic ${currentUser.token}`,
							},
						}
					)
					.then((res) => {
						if (res.status === 201) {
							let user = {
								id: currentUser.id,
								token: currentUser.token,
							};

							axios
								.get(
									`${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`
								)
								.then((res) => {
									if (res.status === 200) {
										user = {
											...user,
											userName: res.data.userName,
											profilePic: res.data.profilePic,
											email: res.data.email,
											password: res.data.password,
											firstName: res.data.firstName,
											lastName: res.data.lastName,
										};
									}
									console.log(user);
									handleUserLogin(user);
									setUpdated(true);
									setAuthorized(true);
									history.push(`/home/${currentUser.id}`);
								})
								.catch((error) => console.error(error));
						} else {
							console.log(res.status);
						}
					})
					.catch((error) => {
						console.error(error);

						setUpdated(false);
						setAuthorized(false);
					});
			}
		}
	};

	return (
		<Container>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>
						Make changes to your account
					</Heading>

					{updated ? (
						<Alert status="success">
							<AlertIcon />
							Changes made succesfully
						</Alert>
					) : (
						""
					)}

					{!authorized ? (
						<Alert status="error">
							<AlertIcon />
							You are not authorized to access this account
						</Alert>
					) : (
						""
					)}

					{Object.keys(errors)
						.filter((key) => errors[key] === true)
						.map((key) => (
							<Alert status="error" key={key}>
								<AlertIcon />
								Please enter a valid {key}
							</Alert>
						))}
				</Stack>
				<Box
					rounded={"lg"}
					// bg={useColorModeValue("white", "gray.700")}
					bg="white"
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="userName">
							<FormLabel>User Name</FormLabel>
							<Input
								type="text"
								value={userName}
								disabled={id === 0 ? false : true}
								onChange={(event) =>
									setUserName(event.target.value)
								}
								onBlur={validateUserName}
								onFocus={() =>
									setErrors({ ...errors, userName: false })
								}
							/>
						</FormControl>

						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								name="email"
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
								onBlur={validateEmail}
								onFocus={() =>
									setErrors({ ...errors, email: false })
								}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								name="password"
								value={password}
								onChange={(event) =>
									setPassword(event.target.value)
								}
							/>
							<Text fontSize="xs" as="em">
								Password should be atleast 5 characters long
								containing only alphabets and numbers
							</Text>
						</FormControl>

						<FormControl id="pic">
							<FormLabel>Profile Picture</FormLabel>
							{pic !== "" ? (
								<Image
									boxSize="300px"
									borderRadius="full"
									objectFit="cover"
									align="center"
									src={
										process.env.REACT_APP_BACKEND_API +
										"/" +
										pic
									}
									p="5"
								/>
							) : (
								"You haven't uploaded a profile picture yet"
							)}
							<InputGroup>
								<input
									type="file"
									alt="new Profile pic"
									accept="image/x-png,image/jpg,image/jpeg,image/png"
									name="pic"
									ref={fileInput}
									hidden={true}
									onChange={() =>
										setFileName(
											fileInput.current.files[0].name
										)
									}
								/>
								<Input
									placeholder="Your new image file ..."
									onClick={() => {
										fileInput.current.click();
									}}
									onChange={() => {}}
									value={fileName}
								/>
								<InputRightAddon
									children="upload"
									as="button"
									onClick={handleUpload}
								/>
							</InputGroup>
							<Text fontSize="xs" as="em">
								Don't forget to click upload before submitting
								update. Accepted file formats: png, jpeg, jpg
							</Text>
						</FormControl>

						<FormControl id="firstName">
							<FormLabel>First Name</FormLabel>
							<Input
								type="text"
								name="firstName"
								value={firstName}
								onChange={(event) =>
									setFirstName(event.target.value)
								}
							/>
						</FormControl>
						<FormControl id="lastName">
							<FormLabel>Last Name</FormLabel>
							<Input
								type="text"
								name="lastName"
								value={lastName}
								onChange={(event) =>
									setLastName(event.target.value)
								}
							/>
						</FormControl>
						<HStack spacing={6}>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={handleSubmit}
							>
								{id === 0 ? "Create user" : "Update profile"}
							</Button>
							<Button
								bg={"red.400"}
								color={"white"}
								_hover={{
									bg: "red.500",
								}}
								onClick={handleDelete}
								disabled={id === 0 ? true : false}
							>
								DELETE account
							</Button>
						</HStack>
					</Stack>
				</Box>
			</Stack>
		</Container>
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
		handleUserLogin: (payload) =>
			dispatch({ type: ACTIONS.LOGIN, payload: payload }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);
