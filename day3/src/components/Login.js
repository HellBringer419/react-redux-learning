import React, { Component } from "react";
import { UserContext } from "../utils/UserContext";
import { users } from "../utils/users";

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
        if (this.state.email === "") {
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
            // simulate API call
            const loggedInUser = users.find(user => (user.email == this.state.email && user.password == this.state.password));

            if (loggedInUser !== undefined) {
                // set context to this user's id   
                let [, setCurrentUser] = this.context;
                setCurrentUser(loggedInUser);

                this.setState({ isValidated: true });
                this.props.toggleLoginState();
                this.props.history.push(`/home/${loggedInUser.name}`);
            }
            else {
                this.setState({
                    errors: {
                        email: false,
                        password: false,
                        credentials: true,
                    },
                });
            }
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
                            {" "}
                            Email:{" "}
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
                            {" "}
                            Password:{" "}
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
