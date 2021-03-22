import { useContext, useEffect, useReducer, useState } from "react";
import { USER_ACTIONS, userReducer } from "../utils/reducers";
import { UserContext } from "../utils/UserContext";
import { users } from "../utils/users";

const UserSetting = (props) => {
    const [currentUser] = useContext(UserContext);

    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);
    const [pic, setPic] = useState(currentUser.profilePic);

    const [state, dispatch] = useReducer(userReducer, users);

    useEffect(() => {}, []);

    const handleDelete = () => {
        dispatch({
            type: USER_ACTIONS.DELETE_USER,
            payload: { id: currentUser.id },
        });
        props.history.push("/");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: USER_ACTIONS.UPDATE_USER,
            payload: {
                id: currentUser.id,
                email: email,
                password: password,
                profilePic: pic,
            },
        });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
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
                    <input
                        type="file"
                        name="profile-pic"
                        id="profile-pic"
                        className="form-control"
                        // value={this.state.pic}
                        // onChange={handleChange}
                        // onBlur={this.isValidPic}
                    />
                </div>

                <input
                    type="submit"
                    name="submit"
                    id="submit"
                    className="btn btn-primary"
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
