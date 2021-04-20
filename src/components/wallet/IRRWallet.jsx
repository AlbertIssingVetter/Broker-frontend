import React from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import t from "../../lang/t";
import {
    Backdrop,
    Card,
    CardContent,
    CircularProgress,
    Snackbar,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import ColorButton from "../color-button/ColorButton";
import {numberWithCommas} from "../../utils/tools";
import {Skeleton} from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
import SwipeableViews from "react-swipeable-views";
import TransactionTableHistory from "./TransactionTableHistory";

class IRRWallet extends React.Component {

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
                wallet: 'irr'
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
        this.props.history.push(`/wallet/irr/withdraw`);
    }

    handleDepositClick = () => {
        this.props.history.push(`/wallet/irr/deposit`);
    }

    handleTabChange = (event, index) => {
        this.setState({selectedTab: index});
    }

    handleSwipeChange = index => {
        this.setState({selectedTab: index});
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
                            <ColorButton variant="contained" color="error" onClick={this.handleDepositClick}>
                                {t('deposit')}
                            </ColorButton>
                            <ColorButton variant="contained" color="success" onClick={this.handleWithdrawClick}>
                                {t('withdraw')}
                            </ColorButton>
                        </div>
                        <Typography variant="h4" component='h2' gutterBottom>
                            { t('toman') }
                        </Typography>
                        <Typography>
                            {this.state.wallet !== null ? t('yourBalance', numberWithCommas(this.state.wallet.balance), t('toman')) :
                                <Skeleton animation='wave'/>}
                        </Typography>
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

export default withRouter(IRRWallet);
