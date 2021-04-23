import React from "react";
import {withRouter} from 'react-router-dom';
import Chart from "./Chart";
import {Grid} from "@material-ui/core";
import TransactionCard from "./TransactionCard";

class Market extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reference: localStorage.getItem('reference') ? localStorage.getItem('reference') : 'irr',
        }
    }

    handleChangeReference = (event, reference) => {
        if (reference) {
            this.setState({reference})
            localStorage.setItem('reference', reference);
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {this.props.match.params.marketId}
                    <Chart handleChangeReference={this.handleChangeReference} reference={this.state.reference} price={{
                        percent: 10,
                        last: 20,
                        min: 17,
                        max: 23,
                        turnover: 10000,
                    }} chartData={[
                        {time: '2018-12-19', open: 141.77, high: 170.39, low: 120.25, close: 145.72},
                        {time: '2018-12-20', open: 145.72, high: 147.99, low: 100.11, close: 108.19},
                        {time: '2018-12-21', open: 108.19, high: 118.43, low: 74.22, close: 75.16},
                        {time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72},
                        {time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09},
                        {time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29},
                        {time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50},
                        {time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04},
                        {time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40},
                        {time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25},
                        {time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43},
                        {time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10},
                        {time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26},
                    ]}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TransactionCard/>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Market);
