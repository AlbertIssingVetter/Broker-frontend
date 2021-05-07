import React from "react";
import SwipeableViews from "react-swipeable-views";
import {Card, CardContent, Tab, Tabs} from "@material-ui/core";
import t from "../../lang/t";
import TransactionForm from "./TransactionForm";
import coins from "../../utils/coins";
import {withTheme} from "@material-ui/core/styles";

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
                        <Tab style={{color: this.props.theme.palette.error.main}} label={t('sell')}/>
                        <Tab style={{color: this.props.theme.palette.success.main}} label={t('buy')}/>
                    </Tabs>
                    <SwipeableViews index={this.state.selectedTab} onChangeIndex={this.handleSwipeChange}>
                        <TransactionForm sell name={coins[this.props.coin].name} coin={this.props.coin} reference={this.props.reference}
                                         referenceName={this.props.reference === 'irr'? t('toman') : coins[this.props.reference].name}
                                         data={this.props.transaction? this.props.transaction.coin : null}
                                         handleTransactionResponse={this.props.handleTransactionResponse}/>
                        <TransactionForm buy name={this.props.reference === 'irr'? t('toman') : coins[this.props.reference].name}
                                         coin={this.props.coin} referenceName={coins[this.props.coin].name} reference={this.props.reference}
                                         data={this.props.transaction? this.props.transaction.reference: null}
                                         handleTransactionResponse={this.props.handleTransactionResponse}/>
                    </SwipeableViews>
                </CardContent>
            </Card>
        );
    }
}

export default withTheme(TransactionCard);
