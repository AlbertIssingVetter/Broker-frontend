import React from "react";
import {withRouter} from 'react-router-dom';
import {Button, Card, CardActions, CardContent, Grid, Hidden, TextField, Typography} from "@material-ui/core";
import t from "../../lang/t";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import coins from "../../utils/coins";
import {Skeleton} from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
import ColorButton from "../color-button/ColorButton";

class Withdraw extends React.Component {
    
    render() {
        return (
            <Grid container className="withdraw rtl-input">
                <Hidden smDown>
                    <Grid item md={2}/>
                </Hidden>
                <Grid item xs={12} sm={12} md={8}>
                    <Card>
                        <CardContent>
                            <Button variant="outlined" color="primary" className="tutorial-video"
                                    endIcon={<PlayCircleFilledIcon/>}>
                                {t('tutorialVideo')}
                            </Button>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {t("withdrawRequest")}
                            </Typography>
                            <Typography variant="h6" component="h2" gutterBottom>
                                {t("withdrawDescription")}
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4} className="center-vertically">
                                    <Typography>
                                        {t('withdrawCount', this.props.match.params.coinId === "toman" ?
                                            t('toman') : coins[this.props.match.params.coinId].name)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField />
                                </Grid>
                                <Grid item xs={12}>
                                    <Alert icon={false} severity='success'>
                                        {t('yourActiveBalance')}
                                        <Skeleton className='display-inline-block' animation='wave' width={100} height={24}/>
                                    </Alert>
                                    <Button variant={"outlined"} color="primary">{t('select')}</Button>
                                </Grid>
                                <Grid item xs={12} md={4} className="center-vertically">
                                    <Typography>
                                        {t('destinationWalletAddress')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField />
                                </Grid>
                                <Grid item xs={12}>
                                    <Alert icon={false} severity='warning'>
                                        {t('destinationWalletAddressWarningMessage')}
                                    </Alert>
                                </Grid>
                                <Grid item xs={12} md={4} className="center-vertically">
                                    <Typography>
                                        {t('withdrawFee')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField />
                                </Grid>
                                <Grid item xs={12}>
                                    <Alert icon={false} severity='info'>
                                        {t('withdrawFeeInfoMessage')}
                                    </Alert>
                                </Grid>
                                <Grid item xs={12}>
                                    <Alert icon={false} severity='info'>
                                        {t('withdrawInfoMessage')}
                                    </Alert>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <ColorButton color='success'>{t('createWithdrawRequest')}</ColorButton>
                            <Button variant='outlined'>{t('seeFees')}</Button>
                            <Button variant='outlined' onClick={this.props.history.goBack}>{t('back')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Withdraw);
