import React from "react";
import {withRouter} from 'react-router-dom';
import {SvgIcon} from "@material-ui/core";

class DogeCoinIcon extends React.Component {

    render() {
        return (
            <SvgIcon className={this.props.className} viewBox='0 0 226.777 226.777'>
                <path d="M116.338,74.87c-6.069,0-16.236,0-16.236,0v32h25.538v13.399h-25.538v32c0,0,12.65,0,17.023,0   c4.375,0,35.918,0.494,35.87-37.232C152.947,77.313,122.406,74.87,116.338,74.87z"/><path d="M113.609,0C50.864,0,0,50.864,0,113.608c0,62.745,50.864,113.609,113.609,113.609c62.743,0,113.607-50.864,113.607-113.609   C227.216,50.864,176.352,0,113.609,0z M118.073,174.968H76.928V120.27H62.425v-13.399h14.502V52.17c0,0,26.958,0,35.312,0   c8.354,0,63.684-1.735,63.684,62.425C175.923,179.816,118.073,174.968,118.073,174.968z"/>
            </SvgIcon>
        );
    }
}

export default withRouter(DogeCoinIcon);
