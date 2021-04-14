import { Image } from "@chakra-ui/image";
import { Flex, Spacer, Stack, Text, VStack } from "@chakra-ui/layout";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal";

const ProductModal = ({
	isOpen,
	onClose,
	title,
	imageUrl,
	description,
	price,
	expiryDate,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			scrollBehavior={"inside"}
			size={"md"}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex flexDir="column">
						<Stack
							py={2}
							direction={["column", "row"]}
							align="baseline"
						>
							<Text
								fontWeight={600}
								color={"gray.500"}
								fontSize="md"
							>
								Price
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{price}
							</Text>
						</Stack>

						<Spacer />

						<Stack
							py={2}
							direction={["column", "row"]}
							align="baseline"
						>
							<Text
								fontWeight={600}
								color={"gray.500"}
								fontSize="md"
							>
								Description
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{description}
							</Text>
						</Stack>

						<Spacer />

						<Stack
							py={2}
							direction={["column", "row"]}
							align="baseline"
						>
							<Text
								fontWeight={600}
								color={"gray.500"}
								fontSize="md"
							>
								Expiry Date
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{expiryDate ? expiryDate : "(Not provided)"}
							</Text>
						</Stack>

						<Spacer />

						<VStack py={2}>
							<Text
								fontWeight={600}
								color={"gray.500"}
								fontSize="md"
							>
								Product Image
							</Text>
							<Image
								src={
									process.env.REACT_APP_BACKEND_API +
									"/" +
									(imageUrl ? imageUrl : "images/default.jpg")
								}
								alt={`${title}'s image`}
							/>
						</VStack>

						<Spacer />

						<Stack
							py={2}
							direction={["column", "row"]}
							align="baseline"
						>
							<Text
								fontWeight={600}
								color={"gray.500"}
								fontSize="md"
							>
								Title
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{title}
							</Text>
						</Stack>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ProductModal;
