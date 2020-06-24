import React from 'react';
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from "redux";
import reducers from "./store/reducers";
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import {App} from "./App";

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        {' '}
        <App />
    </Provider>,
    document.querySelector('$root')
)
