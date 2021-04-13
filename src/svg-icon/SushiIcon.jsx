import React from "react";
import {withRouter} from 'react-router-dom';
import {SvgIcon} from "@material-ui/core";

class SushiIcon extends React.Component {

    render() {
        return (
            <SvgIcon className={this.props.className} viewBox='0 0 32 32'>
                <path d="M10,18h4c0.6,0,1-0.4,1-1v-4c0-0.6-0.4-1-1-1h-4c-0.6,0-1,0.4-1,1v4C9,17.6,9.4,18,10,18z"/><path d="M20,2c-5.6,0-10,2.6-10,6c0,0.4,0.1,0.7,0.2,1.1C5.5,9.6,2,12,2,15v9c0,3.4,4.4,6,10,6s10-2.6,10-6v-1.1   c4.7-0.5,8-2.9,8-5.9V8C30,4.6,25.6,2,20,2z M20,4c4.7,0,8,2.1,8,4c0,1.8-2.9,3.8-7.3,4c-0.3-0.4-0.7-0.7-1.2-1H22c0.6,0,1-0.4,1-1   V6c0-0.6-0.4-1-1-1h-4c-0.6,0-1,0.4-1,1v3.8C15.6,9.3,14,9,12.3,9C12.1,8.7,12,8.3,12,8C12,6.1,15.3,4,20,4z M12,11   c4.7,0,8,2.1,8,4s-3.3,4-8,4s-8-2.1-8-4S7.3,11,12,11z"/>
            </SvgIcon>
        );
    }
}

export default withRouter(SushiIcon);
