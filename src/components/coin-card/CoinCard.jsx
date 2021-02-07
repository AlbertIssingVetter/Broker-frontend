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
                        {this.props.icon}
                        <Typography className='coin-card-name'>{this.props.name}</Typography>
                        <div className='coin-card-price-div'>
                            {this.props.price === -1000000 ?
                                <Skeleton animation='wave' width={100} height={25}/> :
                                <Typography className='coin-card-price'>{t('price', this.props.price)}</Typography>
                            }
                            {this.props.price === -1000000 ?
                                <Skeleton animation='wave' width={100} height={48}/> :
                                <Alert icon={false} severity={this.props.percent > 0 ? 'success' : 'error'} className='coin-card-percent'>{this.props.percent}%</Alert>
                            }

                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withRouter(CoinCard);
