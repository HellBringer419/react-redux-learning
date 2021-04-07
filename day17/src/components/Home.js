import { Button } from "@chakra-ui/button";
import { Container, HStack, Stack, Text } from "@chakra-ui/layout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

const Home = ({ history }) => {
    const [currentUser] = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (currentUser === null) history.push("/");
        else {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`
                )
                .then((res) => setUser(res.data))
                .catch((error) => console.error(error));
        }
    }, [currentUser, history]);

    return (
        <Container py={4}>
            <Stack spacing="8">
                <Text fontSize="5xl" as="span">
                    Welcome To{" "}
                    <Text fontSize="6xl" display="inline">
                        Brand
                    </Text>
                </Text>
                <Text fontSize="md" as="span">
                    {user ? `Welcome ${user.userName}, we ` : "We "}
                    can show you our awesome{" "}
                    <Text as="b" display="inline">
                        products{" "}
                    </Text>
                    OR Get to know our huge list of{" "}
                    <Text as="b" display="inline">
                        users
                    </Text>
                    .
                </Text>
                <HStack justifyContent={"space-around"}>
                    <Button bg={"gray.200"}>
                        <RouterLink to="/products"> Products </RouterLink>
                    </Button>
                    <Button>
                        <RouterLink to="/users"> Users </RouterLink>
                    </Button>
                </HStack>
            </Stack>
        </Container>
    );
};

export default Home;
