import {Component, useState} from "react";
import React = require("react");
import {SignInDto} from "../../../common/dto/auth/sign-in.dto";
import {connect} from 'react-redux';
import {userLoginFetch} from "../../store/auth/actions";

export class SignIn extends Component<any, any> {
    state: SignInDto = {
        email: '',
        password: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.userLoginFetch(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Войти</h1>

                <label>Email</label>
                <input
                    name='email'
                    placeholder='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                />

                <label>Пароль</label>
                <input
                    name='password'
                    placeholder='Пароль'
                    value={this.state.password}
                    onChange={this.handleChange}
                />

                <input type='submit' />
            </form>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(SignIn)