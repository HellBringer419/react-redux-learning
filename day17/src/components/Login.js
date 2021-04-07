import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Heading, HStack, Stack } from "@chakra-ui/layout";
import axios from "axios";
import React, { Component } from "react";
import { UserContext } from "../utils/UserContext";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isValidated: false,
            errors: { email: false, password: false, credentials: false },
            validEmail: false,
            validPassword: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClearErrors = this.handleClearErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
        this.resetFields = this.resetFields.bind(this);
    }

    // componentDidMount() {
    //     let [currentUser] = this.context;
    //     if (currentUser !== null) this.props.history.push(`/home/${currentUser.id}`);
    //     // console.log(currentUser);
    // }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClearErrors(event) {
        let newErrors = this.state.errors;
        const name = event.target.name;
        newErrors[name] = false;
        this.setState({ errors: newErrors });
    }

    isValidEmail() {
        let newErrors = this.state.errors;
        const re = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

        if (
            this.state.email === "" ||
            !re.test(String(this.state.email).toLowerCase())
        ) {
            newErrors.email = true;
            this.setState({ errors: newErrors, validEmail: false });
            return false;
        }
        newErrors.email = false;
        this.setState({ errors: newErrors, validEmail: true });
        return true;
    }

    isValidPassword() {
        let newErrors = this.state.errors;
        if (this.state.password === "") {
            newErrors.password = true;
            this.setState({ errors: newErrors, validPassword: false });
            return false;
        }
        newErrors.password = false;
        this.setState({ errors: newErrors, validPassword: true });
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.isValidEmail() && this.isValidPassword()) {
            const payload = {
                email: this.state.email,
                password: this.state.password,
            };

            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_API}/auth/login`,
                    payload
                )
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({ isValidated: true });
                        let [, setCurrentUser] = this.context;
                        setCurrentUser(res.data);
                        this.props.history.push(`/home/${res.data.id}`);
                    } else {
                        this.setState({ isValidated: false });
                        this.setState({
                            errors: {
                                email: false,
                                password: false,
                                credentials: true,
                            },
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ isValidated: false });
                    this.setState({
                        errors: {
                            email: false,
                            password: false,
                            credentials: true,
                        },
                    });
                });
        }
    }

    resetFields() {
        this.setState({
            email: "",
            password: "",
            errors: { email: false, password: false, credentials: false },
        });
    }

    render() {
        return (
            <Container>
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>
                            Sign in to your account
                        </Heading>

                        {this.state.isValidated ? (
                            <Alert status="success">
                                <AlertIcon />
                                Logged In succesfully
                            </Alert>
                        ) : (
                            ""
                        )}
                        {this.state.errors.email ? (
                            <Alert status="error">
                                <AlertIcon />
                                Please enter a valid email
                            </Alert>
                        ) : (
                            " "
                        )}
                        {this.state.errors.password ? (
                            <Alert status="error">
                                <AlertIcon />
                                Please enter a valid password
                            </Alert>
                        ) : (
                            " "
                        )}
                        {this.state.errors.credentials ? (
                            <Alert status="error">
                                <AlertIcon />
                                Invalid Username/Password
                            </Alert>
                        ) : (
                            " "
                        )}
                    </Stack>
                    <Box
                        rounded={"lg"}
                        // bg={useColorModeValue("white", "gray.700")}
                        bg="white"
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    onFocus={this.handleClearErrors}
                                    onBlur={this.isValidEmail}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    onFocus={this.handleClearErrors}
                                    onBlur={this.isValidPassword}
                                />
                            </FormControl>
                            <HStack spacing={6}>
                                <Button
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                    onClick={this.handleSubmit}
                                >
                                    Sign in
                                </Button>
                                <Button
                                    bg={"red.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "red.500",
                                    }}
                                    onClick={this.resetFields}
                                >
                                    Reset
                                </Button>
                            </HStack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        );
    }
}
Login.contextType = UserContext;

export default Login;
