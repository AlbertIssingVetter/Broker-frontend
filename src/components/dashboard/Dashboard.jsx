import React from "react";
import {withRouter} from 'react-router-dom';
import {Grid} from "@material-ui/core";
import YourWallet from "./YourWallet";
import AccountStatus from "./AccountStatus";
import DashboardCoins from "./DashboardCoins";
import axios from "axios";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    componentDidMount() {
        this.getDashboardData();
        this.getMarketDataInterval = setInterval(this.getDashboardData, 5000);
    }



    componentWillUnmount() {
        clearInterval(this.getMarketDataInterval);
    }

    getDashboardData = () => {
        axios({
            url: '/dashboard',
            method: 'POST',
        }).then(res => {
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

    render() {
        return (
            <Grid container spacing={3}>
                <DashboardCoins prices={this.state.data.prices}/>
                <Grid item xs={12} md={6}>
                    <YourWallet wallets={this.state.data.userWallets}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AccountStatus/>
                </Grid>

            </Grid>
        );
    }
}

export default withRouter(Dashboard);
