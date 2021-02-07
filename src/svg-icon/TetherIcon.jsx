import React from "react";
import {withRouter} from 'react-router-dom';
import {SvgIcon} from "@material-ui/core";

class TetherIcon extends React.Component {

    render() {
        return (
            <SvgIcon className={this.props.className}  viewBox='0 0 226.777 226.777'>
                <path d="M127.329,100.328v16.979c-4.464,0.224-9.133,0.347-13.94,0.347c-5.223,0-10.278-0.143-15.087-0.411v-13.556   h-0.003v-3.307c-26.678,1.284-46.427,5.897-46.427,11.392c0,6.491,27.542,11.749,61.518,11.749   c33.974,0,61.518-5.258,61.518-11.749C174.907,106.196,154.587,101.533,127.329,100.328z" fill="#231F20"/><path d="M113.389-0.001C50.767-0.001,0,50.763,0,113.387c0,62.621,50.767,113.39,113.389,113.39   c62.622,0,113.388-50.769,113.388-113.39C226.777,50.763,176.01-0.001,113.389-0.001z M127.327,132.638v50.016H98.298V132.57   c-31.075-1.798-54.321-9.026-54.321-17.674c0-8.646,23.246-15.873,54.321-17.674V83.207H58.779V54.179H166.85v29.028h-39.523   l0.002,13.948c31.654,1.684,55.474,8.989,55.474,17.741C182.802,123.65,158.983,130.956,127.327,132.638z"/>
            </SvgIcon>
        );
    }
}

export default withRouter(TetherIcon);
