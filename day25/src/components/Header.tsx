import { FC, MouseEventHandler, useEffect, useState } from "react";
import {
    Link as RouterLink,
    RouteComponentProps,
    useHistory,
} from "react-router-dom";

const Header: FC = () => {
    const history: RouteComponentProps["history"] = useHistory();

    const [authToken, setAuthToken] = useState<string | null>(null);
    useEffect(() => {
        // finds the cookie with key "AUTH_TOKEN", else return null
        setAuthToken(
            document.cookie
                ?.split(";")
                .find((cook) => cook.includes("AUTH_TOKEN"))
                ?.split("=")[1] || null
        );
        console.log(authToken);
        return () => {
            setAuthToken(null);
        };
    }, [authToken]);

    const handleLogout: MouseEventHandler = () => {
        document.cookie =
            "AUTH_TOKEN= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        history.push("/");
    };

    return (
        <nav>
            <ul>
                <li>
                    <RouterLink to="/"> NEW </RouterLink>
                </li>
                {authToken ? (
                    <li>
                        <RouterLink to="/create"> CREATE </RouterLink>
                    </li>
                ) : (
                    ""
                )}
                {authToken ? (
                    <li>
                        <button onClick={handleLogout}> LOG-OUT </button>
                    </li>
                ) : (
                    <li>
                        <RouterLink to="/login"> LOGIN / SIGN-UP </RouterLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;
