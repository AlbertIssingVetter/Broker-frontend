import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent, CircularProgress,
    Grid,
    Hidden,
    Snackbar,
    TextField,
    Typography
} from "@material-ui/core";
import t from "../../lang/t";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import coins from "../../utils/coins";
import {Skeleton} from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
import ColorButton from "../color-button/ColorButton";
import axios from "axios";

class Withdraw extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            wallet: null,
            setting: null,
            snackbarOpen: false,
        }
        this.txtAmount = React.createRef();
        this.txtAddress = React.createRef();
    }

    componentDidMount() {
        axios({
            url: '/wallet/get',
            method: 'POST',
            data: {
                wallet: this.props.match.params.coinId
            }
        }).then(res => {
            if (res.data.status){
                this.setState({wallet: res.data.data.wallet, setting: res.data.data.setting})
            } else {
                this.snackbarMessage = res.data.error.message;
                this.setState({snackbarOpen: true});
            }
        }).catch(err => {
            console.log(err);
        })
    }

    handleSnackbarClose = () => {
        this.setState({snackbarOpen: false});
    }

    onAvailableClick = () => {
        this.txtAmount.current.value = this.state.wallet.balance - this.state.setting[`fee_${this.props.match.params.coinId}_withdraw`]
    }

    onWithdrawClick = () => {
        this.setState({loading: true});
        axios({
            url: '/wallet/withdraw',
            method: 'POST',
            data: {
                wallet: this.props.match.params.coinId,
                to: this.txtAddress.current.value,
                amount: this.txtAmount.current.value,
            }
        }).then(res => {
            if (res.data.status) {
                this.setState({
                    loading: false,
                });
                this.props.history.goBack();
            } else {
                this.snackbarMessage = res.data.error.message;
                this.setState({
                    loading: false,
                    snackbarOpen: true,
                });
            }
        }).catch(err => {
            this.snackbarMessage = t('unknownError');
            this.setState({
                loading: false,
                snackbarOpen: true,
            });
            console.log(err);
        })
    }

    render() {
        return (
            <Grid container className="withdraw">
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
                                        {t('withdrawCount', this.props.match.params.coinId === "irr" ?
                                            t('toman') : coins[this.props.match.params.coinId].name)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField inputRef={this.txtAmount} variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Alert icon={false} severity='success'>
                                        {t('yourActiveBalance')}
                                        {
                                            this.state.wallet ? this.state.wallet.balance - this.state.setting[`fee_${this.props.match.params.coinId}_withdraw`] :
                                                <Skeleton className='display-inline-block' animation='wave' width={100} height={24}/>
                                        }
                                    </Alert>
                                    <Button onClick={this.onAvailableClick}  variant={"outlined"} color="primary">{t('select')}</Button>
                                </Grid>
                                <Grid item xs={12} md={4} className="center-vertically">
                                    <Typography>
                                        {t('destinationWalletAddress')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField inputRef={this.txtAddress} variant='outlined'/>
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
                                    <TextField variant='outlined' disabled
                                               value={this.state.setting ?
                                                   this.state.setting[`fee_${this.props.match.params.coinId}_withdraw`] :
                                                   ''}/>
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
                            <ColorButton onClick={this.onWithdrawClick} color='success'>{t('createWithdrawRequest')}</ColorButton>
                            <Button variant='outlined'>{t('seeFees')}</Button>
                            <Button variant='outlined' onClick={this.props.history.goBack}>{t('back')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Backdrop style={{zIndex: 1100}} open={this.state.loading}>
                    <CircularProgress color="primary"/>
                </Backdrop>
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={5000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="error">
                        {this.snackbarMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}

export default withRouter(Withdraw);
