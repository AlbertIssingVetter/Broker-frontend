import React from "react";
import {withRouter} from 'react-router-dom';
import ProfileIcon from "../../svg-icon/ProfileIcon";
import {Button, Card, CardContent, Popover} from "@material-ui/core";
import Logout from "../login/Logout";
import t from "../../lang/t";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";

class ProfileDropDown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            name: localStorage.getItem('name'),
        }
    }

    componentDidMount() {
        if (!this.state.name) {
            axios({
                url: '/user/profile',
                method: 'POST',
            }).then(res => {
                if (res.data.name && res.data.family) {
                    const name = res.data.name + ' ' + res.data.family;
                    localStorage.setItem('name', name);
                    this.setState({
                        name: name,
                    })
                }
            })
        }
    }

    handleDropDownOpen = (event) => {
        this.setState({anchorEl: event.currentTarget})
    }

    handleDropDownClose = () => {
        this.setState({anchorEl: null})
    }

    handleProfileClick = () => {
        this.props.history.push('/profile');
    }

    render() {
        return (
            <div className="profile-drop-down display-inline-block" >
                <div onClick={this.handleDropDownOpen}>
                    <ProfileIcon className="profile-icon-drop-down"/>
                    <div className="name">{this.state.name}</div>
                    <ExpandMoreIcon className="profile-angle-drop-down"/>
                </div>
                <Popover
                    className='profile-drop-down-popover'
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleDropDownClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Card>
                        <CardContent>
                            <Button onClick={this.handleProfileClick}>{t('profile')}</Button>
                            <Logout/>
                        </CardContent>
                    </Card>
                </Popover>
            </div>
        );
    }
}

export default withRouter(ProfileDropDown);
