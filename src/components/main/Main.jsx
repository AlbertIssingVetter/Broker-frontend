import React from "react";
import {Redirect} from 'react-router-dom'

export default class Login extends React.Component {

    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to='/login' />
        } else {
            return <div>main</div>
        }
    }
}
