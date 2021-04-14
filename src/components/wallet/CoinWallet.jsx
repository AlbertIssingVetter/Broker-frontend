import React from "react";
import {withRouter} from 'react-router-dom';
import {Card, CardContent, Hidden, Typography} from "@material-ui/core";
import t from "../../lang/t";
import {Skeleton} from "@material-ui/lab";
import ColorButton from "../color-button/ColorButton";
import {numberWithCommas} from "../../utils/tools";

class CoinWallet extends React.Component {


    deposit = (event) => {
        event.preventDefault();
        this.props.history.push("/wallet/" + this.props.id);
    }

    withdraw = (event) => {
        event.preventDefault();
        this.props.history.push("/wallet/" + this.props.id + "/withdraw");
    }

    update = (event) => {
        event.preventDefault();
        console.log('update')
    }

    market = (event) => {
        event.preventDefault();
        this.props.history.push("/market/" + this.props.id);
    }

    render() {
        return (
            <Card>
                <CardContent className="display-table">
                    <div className='display-table-cell coin-wallet-name'>
                        <div className='width-100'>
                            <this.props.coin.icon.type className='coin-wallet-logo'/>
                            <Typography className=''>{this.props.coin.name}</Typography>
                        </div>
                    </div>
                    <div className='display-table-cell coin-wallet-count'>
                        {this.props.coin.balance !== undefined ? numberWithCommas(this.props.coin.balance) : <Skeleton animation='wave'/>}
                    </div>
                    <Hidden xsDown>
                        <div className='display-table-cell coin-wallet-address'>
                            {this.props.coin.balance !== undefined ? this.props.coin.address : <Skeleton animation='wave'/>}
                        </div>
                    </Hidden>
                    <Hidden smDown>
                        <div className='display-table-cell coin-wallet-actions'>
                            <ColorButton color='error' className='coin-wallet-button' onClick={this.withdraw}
                                         variant='contained'>{t('withdraw')}</ColorButton>
                            <ColorButton color='success' className='coin-wallet-button' onClick={this.deposit}
                                         vvariant='contained'>{t('deposit')}</ColorButton>
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
