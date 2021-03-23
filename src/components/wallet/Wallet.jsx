import React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Grid, Typography} from "@material-ui/core";
import t from "../../lang/t";
import axios from "axios";
import TomanIcon from "../../svg-icon/TomanIcon";
import CoinWallet from "./CoinWallet";
import BitcoinIcon from "../../svg-icon/BitcoinIcon";
import EthereumIcon from "../../svg-icon/EthereumIcon";
import TetherIcon from "../../svg-icon/TetherIcon";
import LitecoinIcon from "../../svg-icon/LitecoinIcon";

class Wallet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            wallets: [
                {
                    name: t('toman'),
                    id: 'toman',
                    count: -1,
                    icon: <TomanIcon className='coin-wallet-logo'/>
                },
                {
                    name: t('bitcoin'),
                    id: 'btc',
                    count: 120000,
                    icon: <BitcoinIcon className='coin-wallet-logo'/>
                },
                {
                    name: t('ethereum'),
                    id: 'eth',
                    count: 120000,
                    icon: <EthereumIcon className='coin-wallet-logo'/>
                },
                {
                    name: t('tether'),
                    id: 'usdt',
                    count: 120000,
                    icon: <TetherIcon className='coin-wallet-logo'/>
                },
                {
                    name: t('litecoin'),
                    id: 'ltc',
                    count: 120000,
                    icon: <LitecoinIcon className='coin-wallet-logo'/>
                },
            ]
        }
    }


    componentDidMount() {
        axios({
            url: '/user/wallet',
            method: 'POST',
        }).then(res => {
            this.setState({
                loading: false,
                wallets: res.data.data
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
                        this.state.wallets.map(wallet => (
                            <Grid id={wallet.id} item xs={12}>
                                <Link className="no-link" to={`/wallet/${wallet.id}`}>
                                    <CoinWallet wallet={wallet}/>
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
