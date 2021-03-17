import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleLogin(this.state.email);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="email"> Email: </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label htmlFor=""> Password: </label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <input type="submit" />
                <input type="reset" />
            </form>
        );
    }
}

export default Login;
