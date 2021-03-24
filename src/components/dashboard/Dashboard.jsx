import React from "react";
import {withRouter} from 'react-router-dom';
import {Grid} from "@material-ui/core";
import CoinCard from "../coin-card/CoinCard";
import t from "../../lang/t";
import BitcoinIcon from "../../svg-icon/BitcoinIcon";
import TetherIcon from "../../svg-icon/TetherIcon";
import EthereumIcon from "../../svg-icon/EthereumIcon";
import LitecoinIcon from "../../svg-icon/LitecoinIcon";
import coins from "../../utils/coins";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coins
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                {Object.keys(this.state.coins).map(coin => (
                    <Grid item id={coin} xs={12} sm={6} lg={3}>
                        <CoinCard coin={this.state.coins[coin]}/>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default withRouter(Dashboard);
