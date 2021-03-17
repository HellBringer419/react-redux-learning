import { useState } from "react";
import Login from "./Login";
import LoginNext from "./LoginNext";

const LoginWrapper = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    const handleLogin = (emailProvided) => {
        setLoggedIn(true);
        setEmail(emailProvided);
    };

    if (loggedIn) return <LoginNext username={email} />;
    else return <Login handleLogin={handleLogin} />;
};

export default LoginWrapper;
