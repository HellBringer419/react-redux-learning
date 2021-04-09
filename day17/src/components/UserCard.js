import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Stack } from "@chakra-ui/layout";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";

const UserCard = ({ id, userName, profilePic, email, firstName, lastName }) => {
    return (
        <Box
            maxW={"320px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
        >
            <Avatar
                size={"xl"}
                src={
                    process.env.REACT_APP_BACKEND_API +
                    "/" +
                    (profilePic ? profilePic : "images/default.jpg")
                }
                alt={"Avatar Alt"}
                mb={4}
                pos={"relative"}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
                {`${firstName} ${lastName}`}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
                {`${userName}`}
            </Text>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
                {`${email}`}
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
                    <RouterLink to={`/update/user/${id}`}>Edit</RouterLink>
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
                >
                    <RouterLink to={`/update/user/${id}`}>Delete</RouterLink>
                </Button>
            </Stack>
        </Box>
    );
};

export default UserCard;

// <div>
//     <p>{userName}</p>
//     <img
//         src={
//             process.env.REACT_APP_BACKEND_API +
//             "/" +
//             (profilePic ? profilePic : "images/default.jpg")
//         }
//         alt={userName}
//         width="100px"
//         height="100px"
//     />
//     <p>{email}</p>
//     <p>{firstName}</p>
//     <p>{lastName}</p>
// </div>
