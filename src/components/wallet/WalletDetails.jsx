import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Backdrop,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Snackbar,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import t from "../../lang/t";
import coins from "../../utils/coins";
import ColorButton from "../color-button/ColorButton";
import QRCode from "qrcode.react";
import Alert from "@material-ui/lab/Alert";
import SwipeableViews from "react-swipeable-views";
import TransactionTableHistory from "./TransactionTableHistory";
import {Skeleton} from "@material-ui/lab";
import axios from "axios";
import {numberWithCommas} from "../../utils/tools";

class WalletDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            loading: false,
            wallet: null,
            selectedTab: 0,
            transactions: {
                deposit: [],
                withdraw: [],
            }
        }
    }

    componentDidMount() {
        axios({
            url: '/wallet/get',
            method: 'POST',
            data: {
                wallet: this.props.match.params.coinId
            }
        }).then(res => {
            this.setState({
                wallet: res.data.data.wallet,
                transactions: {
                    deposit: res.data.data.deposit,
                    withdraw: res.data.data.withdraw,
                }
            })
        }).catch(err => {
            console.log(err);
        })
    }

    handleWithdrawClick = () => {
        this.props.history.push(`/wallet/${this.props.match.params.coinId}/withdraw`);
    }

    handleTabChange = (event, index) => {
        this.setState({selectedTab: index});
    }

    handleSwipeChange = index => {
        this.setState({selectedTab: index});
    }

    handleCreateWalletClick = () => {
        this.setState({loading: true});
        axios({
            url: '/wallet/add',
            method: 'POST',
            data: {
                wallet: this.props.match.params.coinId
            }
        }).then(res => {
            if (res.data.status) {
                this.setState({
                    loading: false,
                    wallet: {
                        ...this.state.wallet,
                        address: res.data.wallet,
                    }
                });
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

    handleSnackbarClose = () => {
        this.setState({snackbarOpen: false});
    }

    render() {
        return (
            <div className='wallet-details'>
                <Card>
                    <CardContent>
                        <div className='actions'>
                            <ColorButton variant="contained" color="primary" onClick={this.props.history.goBack}>
                                {t('back')}
                            </ColorButton>
                            <ColorButton variant="contained" color="success" onClick={this.handleWithdrawClick}>
                                {t('withdraw')}
                            </ColorButton>
                        </div>
                        <Typography variant="h4" component='h2' gutterBottom>
                            {t('walletOf', this.props.match.params.coinId === "irr" ?
                                t('toman') : coins[this.props.match.params.coinId].name)}
                        </Typography>
                        <Typography>
                            {this.state.wallet !== null ? t('yourBalance', numberWithCommas(this.state.wallet.balance), (this.props.match.params.coinId === "irr" ?
                                t('toman') : coins[this.props.match.params.coinId].name)) :
                                <Skeleton animation='wave'/>}
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            {
                                this.state.wallet !== null && this.state.wallet.address === null ? (
                                    <Grid item xs={12}>
                                        <Typography variant="h4" component='h2' gutterBottom>{t('deposit')}</Typography>
                                        <Typography gutterBottom>{t('createWalletDescription')}</Typography>
                                        <div className='text-center'>
                                            <Button variant='outlined' onClick={this.handleCreateWalletClick}
                                                    color='primary'>{t('createWallet')}</Button>
                                        </div>
                                    </Grid>
                                ) : (
                                    <>
                                        <Grid item xs={12} md={9}>
                                            <Typography variant="h4" component='h2'
                                                        gutterBottom>{t('deposit')}</Typography>
                                            <Typography gutterBottom>{t('depositDescription')}</Typography>
                                            {
                                                this.state.wallet === null ? <Skeleton height={48} animation='wave'/> :
                                                    <Alert className='wallet-address' icon={false} severity='success'>
                                                        {this.state.wallet.address}
                                                    </Alert>
                                            }
                                        </Grid>
                                        <Grid className='qr-code' item xs={12} md={3}>
                                            {this.state.wallet === null ?
                                                <Skeleton width={128} height={128} animation='wave'/> :
                                                <QRCode value={this.state.wallet.address}/>}
                                        </Grid>
                                    </>
                                )
                            }
                        </Grid>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Tabs
                            style={{direction: 'ltr'}}
                            value={this.state.selectedTab} variant='fullWidth'
                            indicatorColor="primary" textColor="primary" onChange={this.handleTabChange}>
                            <Tab label={t('depositHistory')}/>
                            <Tab label={t('withdrawHistory')}/>
                        </Tabs>
                        <SwipeableViews index={this.state.selectedTab} onChangeIndex={this.handleSwipeChange}
                                        enableMouseEvents>
                            <TransactionTableHistory transactions={this.state.transactions.deposit}/>
                            <TransactionTableHistory transactions={this.state.transactions.withdraw}/>
                        </SwipeableViews>
                    </CardContent>
                </Card>
                <Backdrop style={{zIndex: 1100}} open={this.state.loading}>
                    <CircularProgress color="primary"/>
                </Backdrop>
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={5000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="error">
                        {this.snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default withRouter(WalletDetails);
