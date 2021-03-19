import React from "react";
import {withRouter} from 'react-router-dom';
import {SvgIcon} from "@material-ui/core";

class LitecoinIcon extends React.Component {

    render() {
        return (
            <SvgIcon className={this.props.className}  viewBox='0 0 226.777 226.777'>
                <path d="M113.441,0C50.789,0,0,50.79,0,113.443c0,62.654,50.789,113.441,113.441,113.441  c62.654,0,113.443-50.787,113.443-113.441C226.885,50.79,176.096,0,113.441,0z M157.477,168.762H68.839l7.45-35.566l-14.486,9.933  l3.519-19.463l15.151-10.43l14.862-70.939h27.671l-10.232,48.71L148.8,66.213l-4.222,20.167l-36.02,24.693l-7.126,33.93H162.4  L157.477,168.762z"/>
            </SvgIcon>
        );
    }
}

export default withRouter(LitecoinIcon);
