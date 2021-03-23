import React from "react";
import {withRouter} from 'react-router-dom';
import {Card, CardContent, Hidden, Typography} from "@material-ui/core";
import t from "../../lang/t";
import {Skeleton} from "@material-ui/lab";
import ColorButton from "../color-button/ColorButton";

class CoinWallet extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.price !== this.props.price || nextProps.percent !== this.props.percent;
    }

    deposit = (event) => {
        event.preventDefault();
        console.log('deposit')
    }

    withdraw = (event) => {
        event.preventDefault();
        console.log('withdraw')
    }

    update = (event) => {
        event.preventDefault();
        console.log('update')
    }

    market = (event) => {
        event.preventDefault();
        console.log('market')
    }

    render() {
        return (
            <Card>
                <CardContent className="display-table">
                    <div className='display-table-cell coin-wallet-name'>
                        <div className='width-100'>
                            {this.props.wallet.icon}
                            <Typography className=''>{this.props.wallet.name}</Typography>
                        </div>
                    </div>
                    <div className='display-table-cell coin-wallet-count'>
                        {this.props.wallet.count === -1 ? <Skeleton animation='wave'/> : this.props.wallet.count}
                    </div>
                    <Hidden smDown>
                        <div className='display-table-cell coin-wallet-actions'>
                            <ColorButton color='error' className='coin-wallet-button' onClick={this.withdraw}
                                         variant='contained'>{t('withdraw')}</ColorButton>
                            <ColorButton color='success' className='coin-wallet-button' onClick={this.deposit}
                                         vvariant='contained'>{t('deposit')}</ColorButton>
                            <ColorButton color='warning' className='coin-wallet-button' onClick={this.update}
                                         vvariant='contained'>{t('update')}</ColorButton>
                            <ColorButton color='secondary' className='coin-wallet-button' onClick={this.market}
                                         vvariant='contained'>{t('market')}</ColorButton>
                        </div>
                    </Hidden>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(CoinWallet);
