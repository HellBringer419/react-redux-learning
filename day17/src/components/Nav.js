// import { Dropdown } from 'bootstrap';

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const Nav = ({ history }) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(currentUser === null) {
            setUser(null);
        }
        else {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_API}/users/${currentUser.id}`
                )
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => console.error(error));
        }
    }, [currentUser])

    const handleSettings = () => {
        history.push(`/update/${currentUser.id}`);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        history.push("/");
    };

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            {user ? (
                                <li className="nav-item dropdown">
                                    <select
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <option className="dropdown-item">
                                            {user.userName}
                                        </option>
                                        <option
                                            className="dropdown-item"
                                            onClick={handleSettings}
                                        >
                                            Settings
                                        </option>
                                        <option
                                            className="dropdown-item"
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </option>
                                    </select>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/login"> Login </Link>
                                </li>
                            )}
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </div>

                    <Link
                        className="navbar-brand"
                        to={currentUser ? `/home/${currentUser.id}` : "/"}
                    >
                        <img
                            src="https://s2.svgbox.net/hero-solid.svg?ic=camera&color=ecf0f1"
                            width="32"
                            height="32"
                            alt="Logo"
                            className="mx-2"
                        />
                        Brand
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default withRouter(Nav);

{
    /* <select className="dropdown-menu" aria-labelledby="navbarDropdown">
    <option className="dropdown-item">View Profile</option>
    <option className="dropdown-divider"></option>
    <option className="dropdown-item" onClick={handleLogout}>
        Log Out
    </option>
</select>; */
}

{
    /* <span
                                    className="naView Profilev-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="https://s2.svgbox.net/hero-solid.svg?ic=user&color=16a085"
                                        width="32"
                                        height="32"
                                        alt="Profile Picure"
                                    />
                                    <b className="mx-2">John Doe</b>
                                </span>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li className="dropdown-item">
                                        View Profile
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li
                                        className="dropdown-item"
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </li>
                                </ul> */
}

//     <li className="nav-item" onClick={handleLogout}>
//     <a className="nav-link">Logout</a>
// </li>
// <li className="nav-item">
//     <Link
//         to={`/update/:${currentUser.name}`}
//         className="nav-link"
//     >
//         Settings
//     </Link>
// </li>
