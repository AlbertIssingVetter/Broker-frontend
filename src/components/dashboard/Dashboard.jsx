import React from "react";
import {withRouter} from 'react-router-dom';
import {Grid} from "@material-ui/core";
import coins from "../../utils/coins";
import YourWallet from "./YourWallet";
import AccountStatus from "./AccountStatus";
import DashboardCoins from "./DashboardCoins";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coins,
            selected: 'btc'
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <DashboardCoins/>
                <Grid item xs={12} md={6}>
                    <YourWallet/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AccountStatus/>
                </Grid>

            </Grid>
        );
    }
}

export default withRouter(Dashboard);
