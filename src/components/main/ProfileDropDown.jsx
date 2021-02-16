import React from "react";
import {withRouter} from 'react-router-dom';
import ProfileIcon from "../../svg-icon/ProfileIcon";
import {Button, Card, CardContent, Popover} from "@material-ui/core";
import AngleDownIcon from "../../svg-icon/AngleDownIcon";
import Logout from "../login/Logout";
import t from "../../lang/t";

class ProfileDropDown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
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
            <div className="profile-drop-down" >
                <div onClick={this.handleDropDownOpen}>
                    <ProfileIcon className="profile-icon-drop-down"/>
                    <AngleDownIcon className="profile-angle-drop-down"/>
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
