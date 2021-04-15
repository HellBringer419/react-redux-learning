import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/layout";
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from "@chakra-ui/number-input";
import { Textarea } from "@chakra-ui/textarea";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const AddUpdateProduct = ({ history }) => {
	const [title, setTitle] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [expiryDate, setExpiryDate] = useState("");
	const [errors, setErrors] = useState({
		title: false,
		imageUrl: false,
		description: false,
		price: false,
		expiryDate: false,
	});
	const [productExists, setProductExists] = useState(true);
	const [updated, setUpdated] = useState(false);

	const [fileName, setFileName] = useState("");
	const fileInput = useRef();

	const id = Number(useParams().id);

	const resetFields = useCallback(() => {
		if (id === 0) setTitle("");
		setImageUrl("");
		setDescription("");
		setPrice(0);
		setExpiryDate("");
		setErrors({
			title: false,
			imageUrl: false,
			description: false,
			price: false,
		});
		setProductExists(true);
		setUpdated(false);

		setFileName("");
	}, [id]);

	useEffect(() => {
		if (id !== 0) {
			axios
				.get(`${process.env.REACT_APP_BACKEND_API}/products/${id}`)
				.then((res) => {
					setProductExists(true);
					setTitle(res.data.title);
					setImageUrl(res.data.imageUrl);
					setDescription(res.data.description);
					setPrice(res.data.price);
				})
				.catch((error) => {
					console.error(error);
					setProductExists(false);
				});
		} else {
			console.log("CREATE product mode");
		}
		return () => resetFields();
	}, [id, resetFields]);

	const handleUpload = (event) => {
		event.preventDefault();
		if (fileInput.current.files[0] === undefined) {
			setErrors({ ...errors, imageUrl: true });
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
					setImageUrl(res.data.path);
				})
				.catch((error) => console.error(error));
		}
	};

	const validateTitle = () => {
		if (title === "" && title.length < 3) {
			setErrors({ ...errors, title: true });
			return false;
		} else {
			setErrors({ ...errors, title: false });
			return true;
		}
	};

	const validateDescription = () => {
		if (description === "") {
			setErrors({ ...errors, description: true });
			return false;
		} else {
			setErrors({ ...errors, description: false });
			return true;
		}
	};

	const validatePrice = () => {
		if (price < 0) {
			setErrors({ ...errors, price: true });
			return false;
		} else {
			setErrors({ ...errors, price: false });
			return true;
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (validateTitle() && validatePrice() && validateDescription()) {
			const payload = {
				id: id === 0 ? null : id.toString(),
				title: title,
				imageUrl: imageUrl,
				description: description,
				price: Number(price),
				expiryDate: expiryDate !== "" ? new Date(expiryDate) : null,
			};

			if (id === 0) {
				axios
					.post(
						`${process.env.REACT_APP_BACKEND_API}/products`,
						payload
					)
					.then((res) => {
						if (res.status === 201) {
							setUpdated(true);
							history.push("/products");
						}
					})
					.catch((error) => console.error(error));
			} else {
				axios
					.put(
						`${process.env.REACT_APP_BACKEND_API}/products`,
						payload
					)
					.then((res) => {
						if (res.status === 201) {
							setUpdated(true);
							history.push("/products");
						}
					})
					.catch((error) => console.error(error));
			}
		}
	};

	return (
		<Container>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>
						Make changes to your products
					</Heading>

					{updated ? (
						<Alert status="success">
							<AlertIcon />
							Changes made succesfully
						</Alert>
					) : (
						""
					)}

					{![productExists] ? (
						<Alert status="error">
							<AlertIcon />
							Such a product does not exist
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
						<FormControl id="title">
							<FormLabel>Title</FormLabel>
							<Input
								type="text"
								value={title}
								disabled={id === 0 ? false : true}
								onChange={(event) =>
									setTitle(event.target.value)
								}
								onBlur={validateTitle}
								onFocus={() =>
									setErrors({ ...errors, title: false })
								}
							/>
							<Text fontSize="xs" as="em">
								Title should be atleast 3 characters long
							</Text>
						</FormControl>

						<FormControl id="imageUrl">
							<FormLabel>Product Image</FormLabel>
							{imageUrl !== "" ? (
								<Image
									boxSize="300px"
									borderRadius="full"
									objectFit="cover"
									align="center"
									src={
										process.env.REACT_APP_BACKEND_API +
										"/" +
										imageUrl
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
							<Text fontSize="xs" as="em" wordBreak={"keep-all"}>
								Don't forget to click upload before submitting
								update. Accepted file formats: png, jpeg, jpg
							</Text>
						</FormControl>

						<FormControl id="firstName">
							<FormLabel>Description</FormLabel>
							<Textarea
								placeholder="Describe your product"
								size="sm"
								value={description}
								onChange={(event) =>
									setDescription(event.target.value)
								}
							/>
						</FormControl>
						<FormControl id="id">
							<FormLabel>Price (In &#8377;)</FormLabel>
							<NumberInput
								min={0}
								clampValueOnBlur={false}
								value={price}
								onChange={(value) => setPrice(Number(value))}
								onBlur={validatePrice}
								onFocus={() =>
									setErrors({ ...errors, price: false })
								}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
						<FormControl id="expiryDate">
							<FormLabel>Date of Expiry</FormLabel>
							<Input
								type="date"
								name="expiryDate"
								value={expiryDate}
								onChange={(event) => {
									setExpiryDate(event.target.value);
								}}
							/>
						</FormControl>
						<Stack spacing={6} direction={["column", "row"]}>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={handleSubmit}
							>
								{id === 0 ? "Create product" : "Update product"}
							</Button>
							<Button
								bg={"red.400"}
								color={"white"}
								_hover={{
									bg: "red.500",
								}}
								onClick={resetFields}
							>
								Reset
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
};

export default AddUpdateProduct;
