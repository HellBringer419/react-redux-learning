import { AlertIcon } from "@chakra-ui/alert";
import { Alert } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../utils/UserContext";

const UserSetting = ({ history }) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        pic: false,
        firstName: false,
        lastName: false,
        userName: false,
    });
    const [updated, setUpdated] = useState(false);

    const fileInput = useRef();

    useEffect(() => {
        if (currentUser === null) history.push("/");
        else {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`
                )
                .then((res) => {
                    setEmail(res.data.email);
                    // Password is encypted, so not included
                    setPic(res.data.profilePic);
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setUserName(res.data.userName);
                })
                .catch((error) => console.error(error));
        }
    }, [currentUser, history]);

    const handleDelete = (event) => {
        event.preventDefault();
        // axios
        //     .delete(
        //         `${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`,
        //         {
        //             headers: {
        //                 Authorization: `Basic ${currentUser.token}`,
        //             },
        //         }
        //     )
        //     .then((res) => {
        //         history.push("/");
        //         setCurrentUser(null);
        //     })
        //     .catch((error) => console.error(error));
    };

    const handleUpload = (event) => {
        event.preventDefault();
        if (fileInput.current.files[0] === undefined) {
            console.log("no img provided");
        } else {
            let formData = new FormData();
            formData.append("image", fileInput.current.files[0]);
            // axios
            //     .post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
            //         headers: {
            //             "Content-Type": "multipart/form-data",
            //         },
            //     })
            //     .then((res) => {
            //         setPic(res.data.path);
            //         console.log(res.data);
            //     })
            //     .catch((error) => console.error(error));
        }
    };

    const validateEmail = () => {
        let newErrors = errors;
        const re = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

        if (email === "" || !re.test(String(email).toLowerCase())) {
            newErrors.email = true;
            setErrors(newErrors);
            return false;
        } else {
            newErrors.email = false;
            setErrors(newErrors);
            return true;
        }
    };

    const validatePassword = () => {
        let newErrors = errors;
        if (password === "") {
            console.log("passwd empty");
            newErrors.password = true;
            setErrors(newErrors);
            return false;
        } else {
            console.log("passwd NOT empty");
            newErrors.password = false;
            setErrors(newErrors);
            return true;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO: validate email
        // TODO: add confirm passw modal

        if (validateEmail() && validatePassword()) {
            const payload = {
                _id: currentUser.id,
                userName: userName,
                profilePic: pic,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
            };
            console.log(payload);
            // axios
            //     .put(
            //         `${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`,
            //         payload,
            //         {
            //             headers: {
            //                 Authorization: `Basic ${currentUser.token}`,
            //             },
            //         }
            //     )
            //     .then((res) => {
            //         if (res.status === 201) {
            //             setUpdated(true);
            //             history.push(`/home/${currentUser.id}`);
            //         }
            //     })
            //     .catch((error) => console.error(error));
        }
    };

    // TODO: convert validations properly

    return (
        <Container>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>
                        Make changes to your account
                    </Heading>

                    {updated ? (
                        <Alert status="success">
                            <AlertIcon />
                            Changes made succesfully
                        </Alert>
                    ) : (
                        ""
                    )}

                    {Object.keys(errors)
                        .filter((key) => errors[key] === true)
                        .map((key) => (
                            <Alert status="error" key={key}>
                                <AlertIcon />
                                Please enter a valid {key}
                            </Alert>
                        ))}
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
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl id="firstName">
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl id="lastName">
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                            />
                        </FormControl>
                        <HStack spacing={6}>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={handleSubmit}
                            >
                                Sign in
                            </Button>
                            <Button
                                bg={"red.400"}
                                color={"white"}
                                _hover={{
                                    bg: "red.500",
                                }}
                                onClick={handleDelete}
                            >
                                DELETE account
                            </Button>
                        </HStack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default UserSetting;
// <Box p={4}>
//     <form>
//         <h2 className="my-3"> Login here </h2>
//         <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//                 Email:
//             </label>
//             <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="form-control"
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value)}
//             />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//                 Password:
//             </label>
//             <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(event) => setPassword(event.target.value)}
//             />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="profile-pic" className="form-label">
//                 Profile Picture:
//             </label>
//             <img
//                 src={
//                     process.env.REACT_APP_BACKEND_API +
//                     "/" +
//                     (pic ? pic : "images/default.jpg")
//                 }
//                 alt="new user profile pic "
//                 width="100px"
//                 height="100px"
//             />
//             <input
//                 type="file"
//                 name="profile-pic"
//                 id="profile-pic"
//                 className="form-control"
//                 ref={fileInput}
//             />
//             <button onClick={handleUpload}> Upload </button>
//         </div>

//         <div className="mb-3">
//             <label htmlFor="firstName" className="form-label">
//                 First Name:
//             </label>
//             <input
//                 type="text"
//                 name="firstName"
//                 id="firstName"
//                 className="form-control"
//                 value={firstName}
//                 onChange={(event) => setFirstName(event.target.value)}
//             />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="lastName" className="form-label">
//                 Last Name:
//             </label>
//             <input
//                 type="text"
//                 name="lastName"
//                 id="lastName"
//                 className="form-control"
//                 value={lastName}
//                 onChange={(event) => setLastName(event.target.value)}
//             />
//         </div>

//         <div className="mb-3">
//             <label htmlFor="userName" className="form-label">
//                 User Name:
//             </label>
//             <input
//                 type="text"
//                 name="userName"
//                 id="userName"
//                 className="form-control"
//                 value={userName}
//                 onChange={(event) => setUserName(event.target.value)}
//             />
//         </div>

//         <button
//             // type="submit"
//             name="submit"
//             id="submit"
//             className="btn btn-primary"
//             onClick={handleSubmit}
//             value="submit"
//         />

//         <button onClick={handleDelete} className="btn btn-danger mx-2">
//             DELETE this account
//         </button>
//     </form>
// </Box>

// Anish : Separate route and separate component named user setting
//             There we should be able to update user name, profile pic and
//             password Seema: Error should get disappeared Add user screen (Add
//             menu under the header) Akshay: In the update page include all other
//             fields like first name, last name and profile pic. And have a delete
//             button. Once deleted they need to get redirected to login page and
//             the person should not be able to login again. All: Use useState and
//             useReduce to store data Use component life cycle in the class
//             components
