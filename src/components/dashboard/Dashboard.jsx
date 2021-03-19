import React from "react";
import {withRouter} from 'react-router-dom';
import {Grid} from "@material-ui/core";
import CoinCard from "../coin-card/CoinCard";
import t from "../../lang/t";
import BitcoinIcon from "../../svg-icon/BitcoinIcon";
import TetherIcon from "../../svg-icon/TetherIcon";
import EthereumIcon from "../../svg-icon/EthereumIcon";
import LitecoinIcon from "../../svg-icon/LitecoinIcon";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coin: {
                bitcoin: {
                    price: 12000,
                    percent: 2,
                },
                ethereum: {
                    price: 4900,
                    percent: 15,
                },
                tether: {
                    price: 100,
                    percent: -10,
                },
                litecoin: {
                    price: 15222,
                    percent: -12,
                },
            }
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                    <CoinCard name={t('bitcoin')} price={this.state.coin.bitcoin.price}
                              icon={<BitcoinIcon className={'coin-card-icon'}/>} percent={this.state.coin.bitcoin.percent}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CoinCard name={t('ethereum')} price={this.state.coin.ethereum.price}
                              icon={<EthereumIcon className={'coin-card-icon'}/>} percent={this.state.coin.ethereum.percent}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CoinCard name={t('tether')} price={this.state.coin.tether.price}
                              icon={<TetherIcon className={'coin-card-icon'}/>} percent={this.state.coin.tether.percent}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CoinCard name={t('litecoin')} price={this.state.coin.litecoin.price}
                              icon={<LitecoinIcon className={'coin-card-icon'}/>} percent={this.state.coin.litecoin.percent}/>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Dashboard);
