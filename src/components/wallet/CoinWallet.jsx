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
        if (this.props.id !== 'irr') {
            this.props.history.push("/wallet/" + this.props.id);
        } else {
            this.props.history.push("/wallet/" + this.props.id + "/deposit");
        }
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
                            {this.props.coin.icon}
                            <Typography className=''>{this.props.coin.name}</Typography>
                        </div>
                    </div>
                    <div className='display-table-cell coin-wallet-count'>
                        {this.props.coin.balance !== undefined ?
                            (
                                <>
                                    {numberWithCommas(this.props.coin.balance)}
                                    {
                                        this.props.id !== 'irr' &&
                                        <Typography color="textSecondary" className='font-size-11'>
                                            {t('price', numberWithCommas(this.props.coin.lastPrice * this.props.coin.balance))}
                                        </Typography>
                                    }
                                </>
                            ) : <Skeleton animation='wave'/>}
                    </div>
                    <Hidden xsDown>
                        <div className='display-table-cell coin-wallet-address'>
                            {this.props.coin.balance !== undefined ? this.props.coin.address :
                                <Skeleton animation='wave'/>}
                        </div>
                    </Hidden>
                    <Hidden smDown>
                        <div className='display-table-cell coin-wallet-actions'>
                            <ColorButton color='error' className='coin-wallet-button' onClick={this.withdraw}
                                         variant='contained'>{t('withdraw')}</ColorButton>
                            <ColorButton color='success' className='coin-wallet-button' onClick={this.deposit}
                                         variant='contained'>{t('deposit')}</ColorButton>
                            {
                                this.props.id !== 'irr' &&
                                <ColorButton color='secondary' className='coin-wallet-button' onClick={this.market}
                                             variant='contained'>{t('market')}</ColorButton>
                            }
                        </div>
                    </Hidden>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(CoinWallet);
