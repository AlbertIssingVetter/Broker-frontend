import React from "react";
import {withRouter} from 'react-router-dom';
import {Card, CardContent, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import t from "../../lang/t";
import coins from "../../utils/coins";
import ColorButton from "../color-button/ColorButton";
import QRCode from "qrcode.react";
import Alert from "@material-ui/lab/Alert";
import SwipeableViews from "react-swipeable-views";
import TransactionTableHistory from "./TransactionTableHistory";

class WalletDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 12000,
            walletAddress: '0x453FaB1A25Abc34C06a36F67335309c40f9EB9e2',
            selectedTab: 0,
            transactions: {
                deposit: [],
                withdraw: [],
            }
        }
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
                            {t('walletOf', this.props.match.params.coinId === "toman" ?
                                t('toman') : coins[this.props.match.params.coinId].name)}
                        </Typography>
                        <Typography>
                            {t('yourBalance', this.state.balance, (this.props.match.params.coinId === "toman" ?
                                t('toman') : coins[this.props.match.params.coinId].name))}
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={9}>
                                <Typography variant="h4" component='h2' gutterBottom>{t('deposit')}</Typography>
                                <Typography gutterBottom>{t('depositDescription')}</Typography>
                                <Alert className='wallet-address' icon={false} severity='success'>
                                    {this.state.walletAddress}
                                </Alert>
                            </Grid>
                            <Grid className='qr-code' item xs={12} md={3}>
                                <QRCode value={this.state.walletAddress} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Tabs
                            style={{direction: 'ltr'}}
                            value={this.state.selectedTab} variant='fullWidth'
                            indicatorColor="primary" textColor="primary" onChange={this.handleTabChange}>
                            <Tab label={t('depositHistory')} />
                            <Tab label={t('withdrawHistory')} />
                        </Tabs>
                        <SwipeableViews index={this.state.selectedTab} onChangeIndex={this.handleSwipeChange}
                                        enableMouseEvents>
                            <TransactionTableHistory transactions={this.state.transactions.deposit}/>
                            <TransactionTableHistory transactions={this.state.transactions.withdraw}/>
                        </SwipeableViews>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withRouter(WalletDetails);
