import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isValidated: false,
            errors: { email: false, password: false },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
        this.resetFields = this.resetFields.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    isValidEmail() {
        let newErrors = this.state.errors;
        if (this.state.email === "") {
            newErrors.email = true;
            this.setState({ errors: newErrors });
            return false;
        }
        newErrors.email = false;
        this.setState({ errors: newErrors });
        return true;
    }

    isValidPassword() {
        let newErrors = this.state.errors;
        if (this.state.password === "") {
            newErrors.password = true;
            this.setState({ errors: newErrors });
            return false;
        }
        newErrors.password = false;
        this.setState({ errors: newErrors });
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.isValidEmail() && this.isValidPassword()) {
            this.setState({ isValidated: true });
            this.props.toggleLoginState();
            this.props.history.push(`/home/${this.state.email}`);
        }
    }

    resetFields() {
        this.setState({
            email: "",
            password: "",
            errors: { email: false, password: false },
        });
    }

    render() {
        return (
            <div className="container mt-5">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="my-3"> Login here </h2>
                    {this.state.errors.email ? (
                        <div className="alert alert-danger">
                            {" "}
                            Please enter a valid email{" "}
                        </div>
                    ) : (
                        " "
                    )}
                    {this.state.errors.password ? (
                        <div className="alert alert-danger">
                            {" "}
                            Please enter a valid password{" "}
                        </div>
                    ) : (
                        " "
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"> Email: </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.handleChange}
                            onBlur={this.isValidEmail}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"> Password: </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handleChange}
                            onBlur={this.isValidPassword}
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                            this.state.errors.email === false &&
                            this.state.errors.password === false
                                ? false
                                : true
                        }
                    />
                    <input type="reset" className="btn btn-danger mx-2" onClick={this.resetFields} />
                </form>
            </div>
        );
    }
}

export default Login;
