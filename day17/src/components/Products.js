import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ProductCard from "./ProductCard";

// TODO: add pagination
// candiated:
// 1. [Chakra paginator] (https://github.com/niconiahi/chakra-paginator)
// 2. [React paginator] (https://github.com/AdeleD/react-paginate)

const Products = () => {
	const [products, setProducts] = useState([]);
	const [deleteMessage, setDeleteMessage] = useState("");

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_API}/products/`)
			.then((res) => setProducts(res.data))
			.catch((error) => console.error(error));
	}, []);

	const handleDelete = (id) => {
		axios
			.delete(`${process.env.REACT_APP_BACKEND_API}/products/${id}`)
			.then((res) => {
				if (res.status === 200) {
					setProducts(
						products.filter(
							(product) => product._id !== id
						)
					);
					setDeleteMessage(
						`Deleted product ${
							products.find((product) => product._id == id).title
						} with id ${id}`
					);
				}
			})
			.catch((error) => console.error(error));
	};

	return (
		<Container py={4}>
			<Text fontSize="lg"> Our list of products: </Text>
			{deleteMessage !== "" ? (
				<Alert status="error">
					<AlertIcon />
					{deleteMessage}
				</Alert>
			) : (
				""
			)}

			{!products ? (
				<Alert status="error">
					<AlertIcon />
					No products
				</Alert>
			) : (
				""
			)}
			<SimpleGrid spacing="40px" minChildWidth="220px" marginTop={"2"}>
				{products
					? products.map((product) => (
							<ProductCard
								key={product._id}
								id={product._id}
								title={product.title}
								imageUrl={product.imageUrl}
								description={product.description}
								price={product.price}
								handleDelete={handleDelete}
							/>
					  ))
					: ""}

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
					<RouterLink to="/update/product/0">
						<AddIcon w="10" h="10" />
					</RouterLink>
				</Box>
			</SimpleGrid>
		</Container>
	);
};

export default Products;
