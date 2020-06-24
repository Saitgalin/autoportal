import * as React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {SignIn} from './components/Auth/SignIn';
import {SignUp} from "./components/Registration/SignUp";
import {Header} from "./components/Header/Header";
import {useEffect} from "react";

export const App = () => {

	useEffect(() => {
		this.props.getProfileFetch()
	}, []);

	return (
		<Router>
			<Header />
			<Switch>
				<Route path='/signUp'>
					<SignUp />
				</Route>
				<Route path='/signIn'>
					<SignIn />
				</Route>
			</Switch>
		</Router>
	)
}


const mapDispatchToProps = dispatch => ({
	getProfileFetch: () => dispatch()
})

