import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FC, FormEventHandler, Fragment, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Mutation as MutationType } from "../utils/types";

const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
        $email: String!
        $password: String!
        $name: String!
    ) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

const Login: FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const history: RouteComponentProps["history"] = useHistory();

    const [login] = useMutation<MutationType>(LOGIN_MUTATION, {
        variables: {
            email: email,
            password: password,
        },
        onCompleted: ({ login }) => {
            document.cookie = `AUTH_TOKEN=${login?.token};SameSite=Lax`;
            history.push("/");
        },
    });

    const [signup] = useMutation<MutationType>(SIGNUP_MUTATION, {
        variables: {
            name: name,
            email: email,
            password: password,
        },
        onCompleted: ({ signup }) => {
            document.cookie = `AUTH_TOKEN=${signup?.token};SameSite=Lax`;
            history.push("/");
        },
    });

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        if (isLogin === true) {
            try {
                login();
            } catch (error) {
                console.error(
                    `[ERROR] ${
                        error?.message
                    } during LOGIN_MUTATION at date: [${new Date().toDateString()}], time: [${new Date().toTimeString()}]`
                );
            }
        } else if (isLogin === false) {
            try {
                signup();
            } catch (error) {
                console.error(
                    `[ERROR] ${
                        error?.message
                    } during SIGNUP_MUTATION at date: [${new Date().toDateString()}], time: [${new Date().toTimeString()}]`
                );
            }
        } else {
            console.error(
                `[ERROR] isLogin is null || undefined at date: [${new Date().toDateString()}], time: [${new Date().toTimeString()}]`
            );
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4> {isLogin ? "Login" : "Sign Up"}</h4>
                <br />
                {!isLogin && (
                    <Fragment>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>
                        <br />
                    </Fragment>
                )}
                <div>
                    <label htmlFor="email">E-mail: </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="email"
                        placeholder="Choose a safe password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <br />
                <div>
                    <button type="submit"> Submit </button>
                    &nbsp; &nbsp; &nbsp;
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin === true
                            ? "need to create an account?"
                            : "already have an account?"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
