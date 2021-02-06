import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "../login/Signup";
import Login from "../login/Login";
import ForgetPassword from "../login/ForgetPassword";
import Main from "../main/Main";
import {Helmet} from "react-helmet";
import {} from '../../utils/axiosDefault'
import {getLang} from "../../lang/t";
import {CssBaseline} from "@material-ui/core";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <CssBaseline />
                <Helmet>
                    <link rel="stylesheet"
                          href={getLang() === 'fa' ? '/style.rtl.css' : '/style.css'}/>
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
