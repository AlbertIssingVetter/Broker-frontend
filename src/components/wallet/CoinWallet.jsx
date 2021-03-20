import React from "react";
import {withRouter} from 'react-router-dom';
import {Card, CardContent, Typography} from "@material-ui/core";
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

    update = (event) => {
        event.preventDefault();
        console.log('update')
    }

    withdraw = (event) => {
        event.preventDefault();
        console.log('withdraw')
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
                    <div className='display-table-cell coin-wallet-actions'>
                        <ColorButton color='error' className='coin-wallet-button' onClick={this.withdraw}
                                     variant='contained'>{t('withdraw')}</ColorButton>
                        <ColorButton color='success' className='coin-wallet-button' onClick={this.deposit}
                                     vvariant='contained'>{t('deposit')}</ColorButton>
                        <ColorButton color='primary' className='coin-wallet-button' onClick={this.update}
                                     vvariant='contained'>{t('update')}</ColorButton>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(CoinWallet);
