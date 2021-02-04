import React from "react";
import {withRouter} from 'react-router-dom';
import {Button} from "@material-ui/core";
import t from '../../lang/t'
import axios from "axios";

class Logout extends React.Component {

    render() {
        return (
            <Button onClick={this.handleClick} variant={this.props.variant}>{t('logout')}</Button>
        );
    }

    handleClick = () => {
        axios({
            url: '/user/logout',
            method: 'POST'
        }).then(res => {
            if (res.data.status) {
                localStorage.removeItem('token');
                this.props.history.push('/login')
            } else {
                console.log(res.data)
            }
        }).catch(err => {
            if (err.response.status === 401) {
                localStorage.removeItem('token');
                this.props.history.push('/login')
            } else {
                console.log(err.response.data)
            }
        })
    }
}

export default withRouter(Logout);
