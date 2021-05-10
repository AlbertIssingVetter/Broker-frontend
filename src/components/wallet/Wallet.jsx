import React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Grid, Typography} from "@material-ui/core";
import t from "../../lang/t";
import axios from "axios";
import TomanIcon from "../../svg-icon/TomanIcon";
import CoinWallet from "./CoinWallet";
import coins from "../../utils/coins";
import {numberWithCommas} from "../../utils/tools";

class Wallet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coins: {
                irr: {
                    name: t('toman'),
                    id: 'toman',
                    icon: <TomanIcon/>
                },
                ...coins,
            },
            totalAssets: 0
        }
    }


    componentDidMount() {
        axios({
            url: '/wallet',
            method: 'POST',
        }).then(res => {
            let wallets = res.data.data;
            let coins = this.state.coins;
            let totalAssets = 0;
            Object.keys(coins).forEach(coinKey => {
                coins[coinKey].address = wallets[coinKey] ? wallets[coinKey].address : '';
                coins[coinKey].balance = wallets[coinKey] ? wallets[coinKey].balance : 0;
                coins[coinKey].lastPrice = wallets[coinKey] ? wallets[coinKey].lastPrice : 0;
                if (coinKey === 'irr') {
                    totalAssets += coins[coinKey].balance;
                } else {
                    totalAssets += coins[coinKey].lastPrice * coins[coinKey].balance;
                }
            })
            this.setState({
                coins: coins,
                totalAssets
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <Typography variant="h4" className="content-header">{t('myWallet')}</Typography>
                <Typography gutterBottom>{t('yourEstimateAsset', numberWithCommas(this.state.totalAssets))}</Typography>
                <Grid container spacing={3}>
                    {
                        Object.keys(this.state.coins).map(coin => (
                            <Grid key={coin} id={coin} item xs={12}>
                                <Link className="no-link" to={`/wallet/${coin}`}>
                                    <CoinWallet coin={this.state.coins[coin]} id={coin}/>
                                </Link>
                            </Grid>
                        ))
                    }
                </Grid>
            </>
        );
    }
}

export default withRouter(Wallet);
