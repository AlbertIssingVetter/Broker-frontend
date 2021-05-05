import React from "react";
import {withRouter} from 'react-router-dom';
import {Grid, GridList, GridListTile} from "@material-ui/core";
import CoinCard from "../coin-card/CoinCard";
import coins from "../../utils/coins";

class DashboardCoins extends React.Component {

    render() {
        return (
            <Grid style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            }} item xs={12}>
                <GridList style={{
                    flexWrap: 'nowrap',
                    transform: 'translateZ(0)',
                }} cols={2.5}>
                    {Object.keys(coins).map(coin => (
                        <GridListTile style={{height: '125px', width: '25%', minWidth: '350px'}} key={coin}>
                            <CoinCard coin={coins[coin]} coinSymbol={coin} price={this.props.prices ? this.props.prices[coin] : null}/>
                        </GridListTile>
                    ))}
                </GridList>
            </Grid>
        );
    }
}

export default withRouter(DashboardCoins);
