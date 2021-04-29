import React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Grid, Typography} from "@material-ui/core";
import t from "../../lang/t";
import axios from "axios";
import TomanIcon from "../../svg-icon/TomanIcon";
import CoinWallet from "./CoinWallet";
import coins from "../../utils/coins";

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
            }
        }
    }


    componentDidMount() {
        axios({
            url: '/wallet',
            method: 'POST',
        }).then(res => {
            let wallets = res.data.data;
            let coins = this.state.coins;
            Object.keys(coins).forEach(coinKey => {
                coins[coinKey].address = wallets[coinKey].address;
                coins[coinKey].balance = wallets[coinKey].balance;
            })
            this.setState({
                coins: coins
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <Typography variant="h4" className="content-header">{t('myWallet')}</Typography>
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
