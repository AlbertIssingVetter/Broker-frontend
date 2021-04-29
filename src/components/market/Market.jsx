import React from "react";
import {withRouter} from 'react-router-dom';
import Chart from "./Chart";
import {Grid, Snackbar} from "@material-ui/core";
import TransactionCard from "./TransactionCard";
import OpenOffer from "./OpenOffer";
import axios from "axios";
import t from "../../lang/t";
import Alert from "@material-ui/lab/Alert";
import Offers from "./Offers";
import Trades from "./Trades";

class Market extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reference: localStorage.getItem('reference') ? localStorage.getItem('reference') : 'irr',
            data: {},
            loading: true,
        }
        this.snackbarType='';
    }

    handleDeleteOffer = id => {
        let myOffers = this.state.data.myOffers.map(offer => {
            if (offer.id === id) {
                offer.deleting = true
            }
            return offer;
        });
        this.setState({
            data: {
                ...this.state.data,
                myOffers,
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
                let myOffers = this.state.data.myOffers.filter(offer => offer.id !== id);
                this.snackbarMessage = t('openOfferSuccessfullyDelete');
                this.snackbarType = 'success';
                this.setState({
                    data: {
                        ...this.state.data,
                        myOffers,
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
        let myOffers = this.state.data.myOffers.map(offer => {
            if (offer.id === id) {
                offer.deleting = false
            }
            return offer;
        });
        this.setState({
            data: {
                ...this.state.data,
                myOffers,
            },
            snackbarOpen: true
        });
    }

    handleSnackbarClose = () => {
        this.setState({snackbarOpen: false});
    }

    componentDidMount() {
        this.setState({loading: true});
        this.getMarketDate();
        this.getMarketDataInterval = setInterval(this.getMarketDate, 5000);
    }



    componentWillUnmount() {
        clearInterval(this.getMarketDataInterval);
    }

    getMarketDate = () => {
        axios({
            url: '/market',
            method: 'POST',
            data: {
                coin: this.props.match.params.marketId,
                reference: this.state.reference,
            }
        }).then(res => {
            this.setState({loading: false});
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

    handleTransactionResponse = (title, type) => {
        this.snackbarMessage = title;
        this.snackbarType = type;
        this.setState({
            snackbarOpen: true
        });
        this.getMarketDate();
    }


    handleChangeReference = (event, reference) => {
        if (reference) {
            this.setState({reference,loading: true});
            localStorage.setItem('reference', reference);
            this.getMarketDate();
        }
    }

    render() {
        return (
            <Grid container className={this.state.loading ? 'market-loading' : ''} spacing={3}>
                <Grid item xs={12}>
                    <Chart handleChangeReference={this.handleChangeReference} reference={this.state.reference}
                           getDarkMode={this.props.getDarkMode} coin={this.props.match.params.marketId}
                           depthContrast={this.state.data.depthContrast} price={this.state.data.price} chartData={[
                        {time: '2018-12-19', open: 141.77, high: 170.39, low: 120.25, close: 145.72},
                        {time: '2018-12-20', open: 145.72, high: 147.99, low: 100.11, close: 108.19},
                        {time: '2018-12-21', open: 108.19, high: 118.43, low: 74.22, close: 75.16},
                        {time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72},
                        {time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09},
                        {time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29},
                        {time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50},
                        {time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04},
                        {time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40},
                        {time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25},
                        {time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43},
                        {time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10},
                        {time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26},
                    ]}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TransactionCard coin={this.props.match.params.marketId} handleTransactionResponse={this.handleTransactionResponse}
                                     reference={this.state.reference} transaction={this.state.data.transaction}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <OpenOffer handleDeleteOffer={this.handleDeleteOffer} myOffers={this.state.data.myOffers}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Offers offers={this.state.data.offers ? this.state.data.offers.buy : null} buy/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Offers offers={this.state.data.offers ? this.state.data.offers.sell : null} sell/>
                </Grid>
                <Grid item xs={12}>
                    <Trades trades={this.state.data.trades}/>
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

export default withRouter(Market);
