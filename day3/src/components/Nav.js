// import { Dropdown } from 'bootstrap';

const Nav = (props) => {
    const handleLogout = () => {
        props.toggleLoginState();
        props.history.push("/");
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
                            <li className="nav-item dropdown">
                                <span
                                    className="nav-link dropdown-toggle"
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
                                </ul>
                            </li>
                            <li className="nav-item" onClick={handleLogout}>
                                <button className="btn nav-link">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                    <span className="navbar-brand" href="#">
                        <img
                            src="https://s2.svgbox.net/hero-solid.svg?ic=camera&color=ecf0f1"
                            width="32"
                            height="32"
                            alt="Logo"
                            className="mx-2"
                        />
                        Brand
                    </span>
                </div>
            </nav>
        </header>
    );
};

export default Nav;

{/* <select className="dropdown-menu" aria-labelledby="navbarDropdown">
    <option className="dropdown-item">View Profile</option>
    <option className="dropdown-divider"></option>
    <option className="dropdown-item" onClick={handleLogout}>
        Log Out
    </option>
</select>; */}