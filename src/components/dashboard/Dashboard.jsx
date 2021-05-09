import React from "react";
import {withRouter} from 'react-router-dom';
import {Grid, Snackbar} from "@material-ui/core";
import YourWallet from "./YourWallet";
import AccountStatus from "./AccountStatus";
import DashboardCoins from "./DashboardCoins";
import axios from "axios";
import LastTransactions from "./LastTransactions";
import OpenOffer from "../market/OpenOffer";
import t from "../../lang/t";
import Alert from "@material-ui/lab/Alert";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            snackbarOpen: false
        }
    }

    componentDidMount() {
        this.getDashboardData();
        this.getMarketDataInterval = setInterval(this.getDashboardData, 5000);
    }



    componentWillUnmount() {
        clearInterval(this.getMarketDataInterval);
    }

    getDashboardData = () => {
        axios({
            url: '/dashboard',
            method: 'POST',
        }).then(res => {
            if (res.data.status) {
                this.setState({
                    data: res.data.data
                })
            } else {
                console.log('error')
            }
        }).catch(err => {
            console.log(err);
        });
    }

    handleDeleteOffer = id => {
        let offers = this.state.data.offers.map(offer => {
            if (offer.id === id) {
                offer.deleting = true
            }
            return offer;
        });
        this.setState({
            data: {
                ...this.state.data,
                offers,
            }
        })
        axios({
            url: '/offer/delete',
            method: 'POST',
            data: {
                offerID: id,
            }
        }).then(res => {
            if (res.data.status) {
                let offers = this.state.data.offers.filter(offer => offer.id !== id);
                this.snackbarMessage = t('openOfferSuccessfullyDelete');
                this.snackbarType = 'success';
                this.setState({
                    data: {
                        ...this.state.data,
                        offers,
                    },
                    snackbarOpen: true
                })
            } else {
                this.snackbarMessage = res.data.error.message;
                this.handleDeleteOfferError(id);
            }
        }).catch(err => {
            this.snackbarMessage = t('unknownError');
            this.handleDeleteOfferError(id);
        })
    }

    handleDeleteOfferError = id => {
        this.snackbarType = 'error';
        let offers = this.state.data.offers.map(offer => {
            if (offer.id === id) {
                offer.deleting = false
            }
            return offer;
        });
        this.setState({
            data: {
                ...this.state.data,
                offers,
            },
            snackbarOpen: true
        });
    }

    render() {
        return (
            <Grid container spacing={3}>
                <DashboardCoins prices={this.state.data.prices}/>
                <Grid item xs={12} md={6}>
                    <YourWallet wallets={this.state.data.userWallets}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AccountStatus accountStatus={this.state.data.status}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <OpenOffer handleDeleteOffer={this.handleDeleteOffer} dashboard myOffers={this.state.data.offers}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <LastTransactions transactions={this.state.data.transactions}/>
                </Grid>
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={5000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity={this.snackbarType}>
                        {this.snackbarMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}

export default withRouter(Dashboard);
