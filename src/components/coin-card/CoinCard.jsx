import React from "react";
import {withRouter} from 'react-router-dom';
import {ButtonBase, Card, CardContent, Typography} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import t from "../../lang/t";
import {Skeleton} from "@material-ui/lab";
import {numberWithCommas} from "../../utils/tools";

class CoinCard extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.price !== this.props.price || nextProps.percent !== this.props.percent;
    }

    handleClick = () => {
        this.props.history.push('/market/' + this.props.coinSymbol);
    }

    render() {
        return (
            <ButtonBase onClick={this.handleClick} className='coin-card'>
                <Card>
                    <CardContent>
                        <this.props.coin.icon.type className='coin-card-icon'/>
                        <Typography className='coin-card-name'>{this.props.coin.name}</Typography>
                        <div className='coin-card-price-div'>
                            {this.props.price ?
                                <>
                                    <Typography className='coin-card-price'>
                                        {t('price', numberWithCommas(this.props.price.last))}
                                    </Typography>
                                    <Alert icon={false} severity={this.props.price.percent >= 0 ? 'success' : 'error'}
                                           className='coin-card-percent'>{this.props.price.percent}%</Alert>
                                </> :
                                <>
                                    <Skeleton animation='wave' width={154} height={25}/>
                                    <Skeleton animation='wave' width={154} height={48}/>
                                </>
                            }

                        </div>
                    </CardContent>
                </Card>
            </ButtonBase>
        );
    }
}

export default withRouter(CoinCard);
