import React from "react";
import {Redirect} from 'react-router-dom'

export default class Main extends React.Component {

    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to='/login' />
        } else {
            return <div>main</div>
        }
    }
}
