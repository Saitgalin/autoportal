import * as React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';


const App = () => {
	return (
		<Router>
			<h2><a href="/">init</a></h2>
			<nav>
				<ul>
					<li>
						<Link to='/'>react init</Link>
					</li>
				</ul>
			</nav>

			<Switch>
				<Route path='/'>
				</Route>
			</Switch>
		</Router>
	)
}

render(<App />, document.getElementById('app'));
