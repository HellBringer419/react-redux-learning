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

const UserModal = ({
	isOpen,
	onClose,
	userName,
	profilePic,
	email,
	firstName,
	lastName,
	role,
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
				<ModalHeader>{userName}</ModalHeader>
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
								First Name
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{firstName}
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
								Last Name
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{lastName}
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
								E-mail
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{email}
							</Text>
						</Stack>

						<Spacer />

						<VStack py={2}>
							<Text
								fontWeight={600}
								color={"gray.500"}
								fontSize="md"
							>
								Profile Pic
							</Text>
							<Image
								src={
									process.env.REACT_APP_BACKEND_API +
									"/" +
									(profilePic
										? profilePic
										: "images/default.jpg")
								}
								alt={`${userName}'s Profile Picture`}
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
								User Name
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{userName}
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
								Role
							</Text>
							<Text
								fontWeight={300}
								color={"gray.900"}
								fontSize="lg"
							>
								{role}
							</Text>
						</Stack>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default UserModal;
