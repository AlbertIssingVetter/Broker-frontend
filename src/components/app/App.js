import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "../login/Signup";
import Login from "../login/Login";
import ForgetPassword from "../login/ForgetPassword";
import Main from "../main/Main";
import {Helmet} from "react-helmet";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <Helmet>
                    <link rel="stylesheet"
                          href={localStorage.getItem('lang') === 'fa' ? '/style.rtl.css' : '/style.css'}/>
                </Helmet>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/forget-password" component={ForgetPassword}/>
                    <Route path="/" component={Main}/>
                </Switch>
            </Router>
        );
    }
}
