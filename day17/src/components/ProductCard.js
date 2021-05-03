import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import ProductModal from "./ProductModal";

const ProductCard = ({
	id,
	title,
	imageUrl,
	description,
	price,
	expiryDate,
	handleDelete,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Container role="gridcell">
			<Box
				maxW={"320px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				rounded={"lg"}
				p={6}
				textAlign={"center"}
				onClick={onOpen}
			>
				<Avatar
					size={"xl"}
					src={
						process.env.REACT_APP_BACKEND_API +
						"/" +
						(imageUrl ? imageUrl : "images/default.jpg")
					}
					alt={"Avatar Alt"}
					mb={4}
					pos={"relative"}
				/>
				<Heading fontSize={"2xl"} fontFamily={"body"}>
					{title}
				</Heading>
				<Text fontWeight={600} color={"gray.500"} mb={4}>
					&#8377; {price}
				</Text>

				<Stack mt={8} direction={"row"} spacing={4}>
					<Button
						flex={1}
						fontSize={"sm"}
						rounded={"full"}
						_focus={{
							bg: "gray.200",
						}}
					>
						<RouterLink to={`/update/product/${id}`}>
							Edit
						</RouterLink>
					</Button>
					<Button
						flex={1}
						fontSize={"sm"}
						rounded={"full"}
						bg={"blue.400"}
						color={"white"}
						boxShadow={
							"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
						}
						_hover={{
							bg: "blue.500",
						}}
						_focus={{
							bg: "blue.500",
						}}
						onClick={() => handleDelete(id)}
					>
						Delete
					</Button>
				</Stack>
			</Box>

			<ProductModal
				isOpen={isOpen}
				onClose={onClose}
				title={title}
				imageUrl={imageUrl}
				description={description}
				price={price}
				expiryDate={expiryDate}
			/>
		</Container>
	);
};

export default ProductCard;
