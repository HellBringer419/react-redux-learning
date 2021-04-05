import axios from "axios";
import React, { Component } from "react";
import { UserContext } from "../utils/UserContext";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isValidated: false,
            errors: { email: false, password: false, credentials: false },
            validEmail: false,
            validPassword: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
        this.resetFields = this.resetFields.bind(this);
        // context in class based
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    isValidEmail() {
        let newErrors = this.state.errors;
        const re = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

        if (
            this.state.email === "" ||
            !re.test(String(this.state.email).toLowerCase())
        ) {
            newErrors.email = true;
            this.setState({ errors: newErrors, validEmail: false });
            return false;
        }
        newErrors.email = false;
        this.setState({ errors: newErrors, validEmail: true });
        return true;
    }

    isValidPassword() {
        let newErrors = this.state.errors;
        if (this.state.password === "") {
            newErrors.password = true;
            this.setState({ errors: newErrors, validPassword: false });
            return false;
        }
        newErrors.password = false;
        this.setState({ errors: newErrors, validPassword: true });
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.isValidEmail() && this.isValidPassword()) {
            const payload = {
                email: this.state.email,
                password: this.state.password,
            };

            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_API}/auth/login`,
                    payload
                )
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({ isValidated: true });
                        let [, setCurrentUser] = this.context;
                        setCurrentUser(res.data);
                        this.props.history.push(`/home/${res.data.id}`);
                    } else {
                        this.setState({ isValidated: false });
                        this.setState({
                            errors: {
                                email: false,
                                password: false,
                                credentials: true,
                            },
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ isValidated: false });
                    this.setState({
                        errors: {
                            email: false,
                            password: false,
                            credentials: true,
                        },
                    });
                });
        }
    }

    resetFields() {
        this.setState({
            email: "",
            password: "",
            errors: { email: false, password: false, credentials: false },
        });
    }

    render() {
        return (
            <div className="container mt-5">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="my-3"> Login here </h2>
                    {this.state.isValidated ? (
                        <div className="alert alert-success">
                            Logged In succesfully
                        </div>
                    ) : (
                        ""
                    )}
                    {this.state.errors.email ? (
                        <div className="alert alert-danger">
                            Please enter a valid email
                        </div>
                    ) : (
                        " "
                    )}
                    {this.state.errors.password ? (
                        <div className="alert alert-danger">
                            Please enter a valid password
                        </div>
                    ) : (
                        " "
                    )}
                    {this.state.errors.credentials ? (
                        <div className="alert alert-danger">
                            Invalid Username/Password
                        </div>
                    ) : (
                        " "
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={(event) => {
                                this.handleChange(event);
                                this.isValidEmail();
                            }}
                            onBlur={this.isValidEmail}
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
                            value={this.state.password}
                            onChange={(event) => {
                                this.handleChange(event);
                                this.isValidPassword();
                            }}
                            onBlur={this.isValidPassword}
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                            this.state.validEmail && this.state.validPassword
                                ? false
                                : true
                        }
                    />
                    <input
                        type="reset"
                        className="btn btn-danger mx-2"
                        onClick={this.resetFields}
                    />
                </form>
            </div>
        );
    }
}
Login.contextType = UserContext;

export default Login;
