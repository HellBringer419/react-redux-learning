import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_API}/users/`)
            .then((res) => setUsers(res.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            {users.map((user) => (
                <UserCard
                    key={user._id}
                    userName={user.userName}
                    profilePic={user.profilePic}
                    email={user.email}
                    firstName={user.firstName}
                    lastName={user.lastName}
                />
            ))}
        </div>
    );
};

export default Users;
