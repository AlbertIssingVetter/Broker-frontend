import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "../login/Signup";
import Login from "../login/Login";
import ForgetPassword from "../login/ForgetPassword";
import Main from "../main/Main";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <div>

                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/forget-password" component={ForgetPassword}/>
                        <Route path="/" component={Main}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
