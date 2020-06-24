import {Component, useState} from "react";
import React = require("react");
import {CreateAccountDto} from "../../../common/dto/auth/create-account.dto";
import {connect} from 'react-redux';
import {userPostFetch} from "../../store/registration/actions";

export class SignUp extends Component<any, any> {
    state: CreateAccountDto = {
        fio: '',
        phone: '',
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
        this.props.userPostFetch(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Регистрация аккаунта</h1>

                <label>Фамилия Имя Отчество</label>
                <input
                    name='fio'
                    placeholder="ФИО"
                    value={this.state.fio}
                    onChange={this.handleChange}
                />

                <label>Пароль</label>
                <input
                    type='password'
                    name='password'
                    placeholder='Пароль'
                    value={this.state.password}
                    onChange={this.handleChange}
                />

                <label>EMail</label>
                <input
                    name='email'
                    placeholder='ЕMail'
                    value={this.state.email}
                    onChange={this.handleChange}
                />

                <label>Номер телефона</label>
                <input
                    name='phone'
                    placeholder='прим. 79279684860'
                    value={this.state.phone}
                    onChange={this.handleChange}
                />

                <input type='submit' />

            </form>
        );
    }

}


const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(SignUp)