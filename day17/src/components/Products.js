import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [deleteMessage, setDeleteMessage] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	// constants for pagination
	const PER_PAGE = 1;
	const indexOfLastProductInView = currentPage * PER_PAGE;
	const indexOfFirstProductInView = indexOfLastProductInView - PER_PAGE;

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					`${process.env.REACT_APP_BACKEND_API}/products/`
				);
				setProducts(res.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProducts();
	}, []);

	const handleDelete = (id) => {
		axios
			.delete(`${process.env.REACT_APP_BACKEND_API}/products/${id}`)
			.then((res) => {
				if (res.status === 200) {
					setProducts(
						products.filter((product) => product._id !== id)
					);
					setCurrentPage(1);

					setDeleteMessage(
						`Deleted product ${
							products.find((product) => product._id === id).title
						} with id ${id}`
					);
					setTimeout(() => setDeleteMessage(""), 3000);
				}
			})
			.catch((error) => console.error(error));
	};

	const handlePaginate = (nextPage) => {
		setCurrentPage(nextPage);
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
					products
						.slice(
							indexOfFirstProductInView,
							indexOfLastProductInView
						)
						.map((product) => (
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
					<RouterLink to="/update/product/0">
						<AddIcon w="10" h="10" />
					</RouterLink>
				</Box>
			</SimpleGrid>

			<Pagination
				itemsPerPage={PER_PAGE}
				totalItems={products.length}
				handlePaginate={handlePaginate}
			/>
		</Container>
	);
};

export default Products;
