import React from "react";
import {withRouter} from 'react-router-dom';
import LanguageSelector from "../langauge-selector/LanguageSelector";
import ProfileIcon from "../../svg-icon/ProfileIcon";
import {Button, Card, CardContent, Grow, Paper, Toolbar} from "@material-ui/core";
import AngleDownIcon from "../../svg-icon/AngleDownIcon";
import Logout from "../login/Logout";
import t from "../../lang/t";

class ProfileDropDown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }

    handleDropDownToggle = () => {
        this.setState({open: !this.state.open})
    }

    handleProfileClick = () => {
        this.props.history.push('/profile');
    }

    render() {
        return (
            <div onClick={this.handleDropDownToggle} className="profile-drop-down" >
                <ProfileIcon className="profile-icon-drop-down"/>
                <AngleDownIcon className="profile-angle-drop-down"/>
                <Grow in={this.state.open}>
                    <Card>
                        <CardContent>
                            <Button onClick={this.handleProfileClick}>{t('profile')}</Button>
                            <Logout/>
                        </CardContent>
                    </Card>
                </Grow>
            </div>
        );
    }
}

export default withRouter(ProfileDropDown);
