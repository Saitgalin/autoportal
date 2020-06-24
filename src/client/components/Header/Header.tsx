import React from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <h2><Link to="/signUp">Регистрация</Link></h2>
            <h2><Link to='/signIn'>Авторизация</Link></h2>
            {this.props.currentUser.fio
                ? <button onClick={this.handleClick}>Log Out</button>
                : null
            }
        </div>

    )
}