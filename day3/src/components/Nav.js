const Nav = (props) => {
    return (
        <header className="topbar">
            <span className="profile-pic">
                <img
                    src="https://s2.svgbox.net/hero-solid.svg?ic=user&color=16a085"
                    width="32"
                    height="32"
                    alt="Profile Picure"
                />
            </span>
            <span className="brand">John Doe</span>

            <span className="logo">
                <img
                    src="https://s2.svgbox.net/hero-solid.svg?ic=camera&color=ecf0f1"
                    width="32"
                    height="32"
                    alt="Logo"
                />
            </span>
        </header>
    );
};

export default Nav;
