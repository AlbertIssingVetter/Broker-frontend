import React from "react";
import {withRouter} from 'react-router-dom';
import TransactionTableHistory from "../wallet/TransactionTableHistory";
import SwipeableViews from "react-swipeable-views";
import {Card, CardContent, Tab, Tabs} from "@material-ui/core";
import t from "../../lang/t";
import TransactionForm from "./TransactionForm";

class TransactionCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0
        }
    }

    handleSwipeChange = index => {
        this.setState({selectedTab: index});
    }

    handleTabChange = (event, index) => {
        this.setState({selectedTab: index});
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Tabs
                        style={{direction: 'ltr'}}
                        value={this.state.selectedTab} variant='fullWidth'
                        indicatorColor="primary" textColor="primary" onChange={this.handleTabChange}>
                        <Tab label={t('sell')}/>
                        <Tab label={t('buy')}/>
                    </Tabs>
                    <SwipeableViews index={this.state.selectedTab} onChangeIndex={this.handleSwipeChange}
                                    enableMouseEvents>
                        <TransactionForm/>
                        <TransactionForm/>
                    </SwipeableViews>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(TransactionCard);
