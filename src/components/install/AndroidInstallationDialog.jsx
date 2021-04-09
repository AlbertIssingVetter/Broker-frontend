import React from "react";
import {withRouter} from 'react-router-dom';
import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import t, {getLang} from "../../lang/t";
import cafebazaarBadge from './cafebazaar-badge.png';
import cafebazaarENBadge from './cafebazaar-en-badge.png';
import googlePlayBadge from './google-play-badge.png';
import DirectDownload from "./DirectDownload";

class AndroidInstallationDialog extends React.Component {


    render() {
        return (
            <Dialog onClose={this.props.handleClose} open={this.props.open}>
                <DialogTitle>{t('installAndroidTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t('installAndroidDescription')}</DialogContentText>
                    <Grid container spacing={2}>
                        <Grid className='installation-badge' item xs={12} sm={4}>
                            <DirectDownload/>
                        </Grid>
                        <Grid className='installation-badge' item xs={12} sm={4}>
                            <img src={getLang() === 'fa'? cafebazaarBadge : cafebazaarENBadge} alt=""/>
                        </Grid>
                        <Grid className='installation-badge' item xs={12} sm={4}>
                            <img src={googlePlayBadge} alt=""/>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withRouter(AndroidInstallationDialog);
