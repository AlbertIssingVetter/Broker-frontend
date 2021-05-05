import React from "react";
import {withRouter} from 'react-router-dom';
import {Button, Grid, Slider, TextField, Typography} from "@material-ui/core";
import t from "../../lang/t";
import NumberFormat from 'react-number-format';
import ColorButton from "../color-button/ColorButton";
import {numberWithCommas} from "../../utils/tools";
import axios from "axios";

class TransactionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPrice: '',
            unitPrice: '',
            amount: '',
            snackbarOpen: true,
            loading: false,
        }
        this.snackbarType = 'error';
    }

    handleTotalPriceSliderChange = (event, newValue) => {
        if (this.props.buy) {
            const totalPrice = newValue * this.props.data.balance / 100
            if (this.state.unitPrice) {
                this.setState({
                    totalPrice,
                    amount: totalPrice / this.state.unitPrice,
                })
            } else {
                this.setState({
                    totalPrice
                })
            }
        } else {
            const amount = newValue * this.props.data.balance / 100
            if (this.state.unitPrice) {
                this.setState({
                    amount,
                    totalPrice: amount * this.state.unitPrice,
                })
            } else {
                this.setState({
                    amount
                })
            }
        }
    }

    handleTotalPriceTextFieldChange = (event) => {
        const totalPrice = (event.target.value.replaceAll(',', ''))
        if (this.state.unitPrice) {
            this.setState({
                totalPrice,
                amount: totalPrice / this.state.unitPrice,
            })
        } else {
            this.setState({
                totalPrice
            })
        }
    }

    handleUnitPriceTextFieldChange = (event) => {
        if (this.props.buy) {
            const unitPrice = (event.target.value.replaceAll(',', ''))
            if (this.state.totalPrice) {
                this.setState({
                    unitPrice,
                    amount: this.state.totalPrice / unitPrice,
                })
            } else {
                this.setState({
                    unitPrice,
                })
            }
        } else {
            const unitPrice = (event.target.value.replaceAll(',', ''))
            if (this.state.amount) {
                this.setState({
                    unitPrice,
                    totalPrice: this.state.amount * unitPrice,
                })
            } else {
                this.setState({
                    unitPrice,
                })
            }
        }

    }

    handleAmountTextFieldChange = (event) => {
        const amount = (event.target.value.replaceAll(',', ''));
        if (this.state.unitPrice) {
            this.setState({
                amount,
                totalPrice: amount * this.state.unitPrice
            })
        } else {
            this.setState({
                amount
            })
        }
    }

    handleBtnSelectBestOffer = () => {
        const unitPrice = Number(this.props.data.bestOffer)
        if (this.state.totalPrice) {
            this.setState({
                unitPrice,
                amount: this.state.totalPrice / unitPrice,
            })
        } else {
            this.setState({
                unitPrice,
            })
        }
    }

    handleBuyClick = () => {
        this.handleAddOffer(1)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.marketId !== prevProps.match.params.marketId) {
            this.setState({
                totalPrice: '',
                unitPrice: '',
                amount: '',
            });
        }
    }

    handleSellClick = () => {
        this.handleAddOffer(0);
    }

    handleBoundary = (price) => {
        if (!price) return false;
         if (price > this.props.data.max) {
            this.props.handleTransactionResponse(t('moreThanMax'), 'error');
            return false;
        } else if (price < this.props.data.min) {
            this.props.handleTransactionResponse(t('lessThanMin'), 'error');
            return false;
        } else {
             if (this.props.sell && price > this.props.data.balance) {
                 this.props.handleTransactionResponse(t('moreThanYourBalance'), 'error');
                 return false;
             } else if (this.props.buy && this.state.totalPrice > this.props.data.balance) {
                 this.props.handleTransactionResponse(t('moreThanYourBalance'), 'error');
                 return false;
             }
         }
        return true;
    }

    handleAddOffer = type => {
        if (!this.handleBoundary(this.state.amount)) {
            return;
        }
        this.setState({loading: true})
        axios({
            url: '/offer/add',
            method: 'POST',
            data: {
                coin: this.props.coin,
                reference: this.props.reference,
                type,
                volume: this.state.amount,
                price: this.state.unitPrice,
            }
        }).then(res => {
            if (res.data.status) {
                this.props.handleTransactionResponse(t('addOfferSuccessfully'), 'success');
                this.setState({
                    unitPrice: '',
                    totalPrice: '',
                    amount: '',
                    loading: false,
                })
            } else {
                this.setState({
                    loading: false,
                })
                this.props.handleTransactionResponse(res.data.error.message, 'error');
            }
        }).catch(err => {
            this.setState({
                loading: false,
            })
            this.props.handleTransactionResponse(t('unknownError'), 'error');
        })
    }


    render() {
        return (
            <Grid className='language-direction transaction-form'>
                <Grid className='grid' item xs={12}>
                    <NumberFormat value={this.state.unitPrice} variant='outlined' label={t('unitPrice')}
                                  customInput={TextField} thousandSeparator={true}
                                  onChange={this.handleUnitPriceTextFieldChange}/>
                </Grid>
                <Grid className='grid' item xs={12}>
                    <NumberFormat value={this.state.amount} variant='outlined' label={t('coinAmount')}
                                  customInput={TextField} thousandSeparator={true}
                                  onChange={this.handleAmountTextFieldChange}/>

                </Grid>
                <Grid className='grid' item xs={12}>
                    <NumberFormat value={this.state.totalPrice} variant='outlined' label={t('totalPrice')}
                                  customInput={TextField} thousandSeparator={true}
                                  onChange={this.handleTotalPriceTextFieldChange}/>
                </Grid>
                <Grid className='grid your-balance' item xs={12}>
                    <Typography>
                        {t('yourBalance', this.props.data ? numberWithCommas(this.props.data.balance) : '0', this.props.name)}
                    </Typography>
                    <Slider marks valueLabelDisplay="auto" step={10}
                            value={this.props.data && this.props.data.balance > 0 ? (
                                this.props.buy ? Math.round(this.state.totalPrice * 100 / this.props.data.balance) :
                                    Math.round(this.state.amount * 100 / this.props.data.balance)
                            ) : 0}
                            onChange={this.handleTotalPriceSliderChange}/>
                </Grid>

                <Grid className='grid your-balance' item xs={12}>
                    <Typography className='display-inline-block'>
                        {t('bestOffer', this.props.data ? numberWithCommas(this.props.data.bestOffer) : '0', this.props.name)}
                    </Typography>
                    <Button className='btn-select' color='primary'
                            onClick={this.handleBtnSelectBestOffer}>{t('select')}</Button>
                </Grid>
                <Grid className='grid your-balance' item xs={12}>
                    <Typography color='textSecondary' className='receivedAmount'>
                        {this.props.buy ?
                            t('yourReceipt', this.state.amount ?
                                (this.state.amount - (this.state.amount * Number(this.props.data.fee))) : 0, this.props.referenceName) :
                            t('yourReceipt', this.state.totalPrice ?
                                (this.state.totalPrice - (this.state.totalPrice * Number(this.props.data.fee))) : 0, this.props.referenceName)
                        }
                    </Typography>
                </Grid>
                <Grid className='grid your-balance' item xs={12}>
                    {
                        this.props.buy ?
                            (<ColorButton disabled={this.state.loading} onClick={this.handleBuyClick} className='float-end'
                                          color='success'>{t('buy')}</ColorButton>) :
                            (<ColorButton disabled={this.state.loading} onClick={this.handleSellClick} className='float-end'
                                          color='error'>{t('sell')}</ColorButton>)
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(TransactionForm);
