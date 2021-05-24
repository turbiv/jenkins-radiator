import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import { Provider } from 'react-redux'
import notificationReducer from "./reducers/notificationReducer"
import loginReducer from "./reducers/loginReducer"
import './i18n';

const reducers = combineReducers({
  notification: notificationReducer,
  login: loginReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

const renderPage = () => ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

renderPage()
store.subscribe(renderPage)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
