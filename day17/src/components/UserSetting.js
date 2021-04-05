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
                    setPassword(res.data.password);
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
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`,
                {
                    headers: {
                        Authorization: `Basic ${currentUser.token}`,
                    },
                }
            )
            .then((res) => {
                // console.log(res);
                history.push("/");
                setCurrentUser(null);
            })
            .catch((error) => console.error(error));
    };

    const handleUpload = (event) => {
        event.preventDefault();
        if (fileInput.current.files[0] === undefined) {
            console.log("no img provided");
        } else {
            let formData = new FormData();
            formData.append("image", fileInput.current.files[0]);
            axios
                .post(`${process.env.REACT_APP_BACKEND_API}/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    setPic(res.data.path);
                    console.log(res.data);
                })
                .catch((error) => console.error(error));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO: validate email
        // TODO: configure payload and auth
        // TODO: add image upload

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
        axios
            .put(
                `${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`,
                payload,
                {
                    headers: {
                        Authorization: `Basic ${currentUser.token}`,
                    },
                }
            )
            .then((res) => {
                if (res.status === 201) history.push(`/home/${currentUser.id}`);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-5">
            <form>
                <h2 className="my-3"> Login here </h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="profile-pic" className="form-label">
                        Profile Picture:
                    </label>
                    <img
                        src={
                            process.env.REACT_APP_BACKEND_API +
                            "/" +
                            (pic ? pic : "images/default.jpg")
                        }
                        alt="new user profile pic "
                        width="100px"
                        height="100px"
                    />
                    <input
                        type="file"
                        name="profile-pic"
                        id="profile-pic"
                        className="form-control"
                        ref={fileInput}
                    />
                    <button onClick={handleUpload}> Upload </button>
                </div>

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name:
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="form-control"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        User Name:
                    </label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        className="form-control"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>

                <button
                    // type="submit"
                    name="submit"
                    id="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    value="submit"
                />

                <button onClick={handleDelete} className="btn btn-danger mx-2">
                    DELETE this account
                </button>
            </form>
        </div>
    );
};

export default UserSetting;

// Anish : Separate route and separate component named user setting
//             There we should be able to update user name, profile pic and
//             password Seema: Error should get disappeared Add user screen (Add
//             menu under the header) Akshay: In the update page include all other
//             fields like first name, last name and profile pic. And have a delete
//             button. Once deleted they need to get redirected to login page and
//             the person should not be able to login again. All: Use useState and
//             useReduce to store data Use component life cycle in the class
//             components
