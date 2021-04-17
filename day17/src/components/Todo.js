import { Checkbox } from "@chakra-ui/checkbox";
import { HStack, Text } from "@chakra-ui/layout";

const Todo = ({ id, text, isCompleted, handleComplete }) => {
	if (isCompleted === true) {
		return (
			<li>
				<HStack spacing="2" boxShadow={"md"} rounded={"lg"} padding="2">
					<Checkbox isDisabled defaultIsChecked>
						<Text as="del">{text}</Text>
					</Checkbox>
				</HStack>
			</li>
		);
	} else {
		return (
			<li>
				<HStack spacing="2" boxShadow={"md"} rounded={"lg"} padding="2">
					<Checkbox onChange={() => handleComplete(id)} iconSize="md">
						<Text>{text}</Text>
					</Checkbox>
				</HStack>
			</li>
		);
	}
};

export default Todo;
