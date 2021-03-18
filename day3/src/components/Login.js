import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isValidated: false,
            errors: { email: true, password: true },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
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
            this.props.history.push(`/home/${this.state.email}`)
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.errors.email ? (
                    <div> Please enter a valid email </div>
                ) : (
                    " "
                )}
                {this.state.errors.password ? (
                    <div> Please enter a valid password </div>
                ) : (
                    " "
                )}
                <div>
                    <label htmlFor="email"> Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        onBlur={this.isValidEmail}
                    />
                </div>

                <div>
                    <label htmlFor=""> Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onBlur={this.isValidPassword}
                    />
                </div>
                <input
                    type="submit"
                    disabled={
                        this.state.errors.email === false &&
                        this.state.errors.password === false
                            ? false
                            : true
                    }
                />
                <input type="reset" />
            </form>
        );
    }
}

export default Login;
