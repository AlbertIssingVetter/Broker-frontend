import React from "react";
import {withRouter} from 'react-router-dom';
import SwipeableViews from "react-swipeable-views";
import {Card, CardContent, Tab, Tabs} from "@material-ui/core";
import t from "../../lang/t";
import TransactionForm from "./TransactionForm";
import coins from "../../utils/coins";

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
                        value={this.state.selectedTab} variant='fullWidth'
                        indicatorColor="primary" textColor="primary" onChange={this.handleTabChange}>
                        <Tab label={t('sell')}/>
                        <Tab label={t('buy')}/>
                    </Tabs>
                    <SwipeableViews index={this.state.selectedTab} onChangeIndex={this.handleSwipeChange}>
                        <TransactionForm sell name={coins[this.props.coin].name} coin={this.props.coin}
                                         reference={this.props.reference === 'irr'? t('toman') : coins[this.props.reference].name}
                                         data={this.props.transaction? this.props.transaction.coin : null}
                                         handleTransactionResponse={this.props.handleTransactionResponse}/>
                        <TransactionForm buy name={this.props.reference === 'irr'? t('toman') : coins[this.props.reference].name}
                                         coin={this.props.coin} reference={coins[this.props.coin].name}
                                         data={this.props.transaction? this.props.transaction.reference: null}
                                         handleTransactionResponse={this.props.handleTransactionResponse}/>
                    </SwipeableViews>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(TransactionCard);
