import React from "react";
import {withRouter} from 'react-router-dom';
import {Card, CardContent, Typography} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import t from "../../lang/t";
import {Skeleton} from "@material-ui/lab";

class CoinCard extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.price !== this.props.price || nextProps.percent !== this.props.percent;
    }

    render() {
        return (
            <div className='coin-card'>
                <Card >
                    <CardContent>
                        <this.props.coin.icon.type className='coin-card-icon'/>
                        <Typography className='coin-card-name'>{this.props.coin.name}</Typography>
                        <div className='coin-card-price-div'>
                            {this.props.coin.price ?
                                <Typography className='coin-card-price'>{t('price', this.props.coin.price)}</Typography> :
                                <Skeleton animation='wave' width={100} height={25}/>
                            }
                            {this.props.coin.price ?
                                <Alert icon={false} severity={this.props.coin.percent > 0 ? 'success' : 'error'} className='coin-card-percent'>{this.props.coin.percent}%</Alert> :
                                <Skeleton animation='wave' width={100} height={48}/>
                            }

                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withRouter(CoinCard);
