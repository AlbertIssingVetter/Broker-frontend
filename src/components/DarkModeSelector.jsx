import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import t from "../lang/t";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';

export default class DarkModeSelector extends React.Component {

    render() {
        return (

            <Tooltip title={t('toggleDarkModeTheme')}>
                <IconButton
                    aria-label="toggle theme change"
                    onMouseDown={this.props.toggleDarkMode}
                    className='MuiAppBar-colorPrimary dark-mode-selector'>
                    {this.props.getDarkMode ? <NightsStayIcon/> : <WbSunnyIcon/>}
                </IconButton>
            </Tooltip>
        );
    }
}

