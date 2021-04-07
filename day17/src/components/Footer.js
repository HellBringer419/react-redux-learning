import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Text } from "@chakra-ui/layout";

const Footer = () => {
    return (
        <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
            px={4}
        >
            <Text maxW={"6xl"} py={4}>
                &copy; 2021 Brand. All rights reserved
            </Text>
        </Box>
    );
};

export default Footer;
