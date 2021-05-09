import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Card,
    CardContent, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
    Typography
} from "@material-ui/core";
import t from "../../lang/t";
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgressWithLabel from "../circular-progress-with-label/CircularProgressWithLabel";
import {numberWithCommas} from "../../utils/tools";

class OpenOffer extends React.Component {

    render() {
        return (
            <>
                <Card className='open-offer'>
                    <CardContent>
                        <Typography variant='h4'>{t('openOffer')}</Typography>
                        {
                            this.props.myOffers ? this.props.myOffers.map(offer => (
                                <div key={offer.id}>
                                    <List className={offer.deleting ? 'deleting' : ''}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CircularProgressWithLabel color={offer.type === '0' ? 'error' : 'success'}
                                                                           value={Number(offer.used * 100 / offer.volume)}/>
                                            </ListItemIcon>
                                            <ListItemText primary={t('unitPrice')} secondary={numberWithCommas(offer.price)}/>
                                            <ListItemText primary={t('coinAmount')} secondary={numberWithCommas(offer.volume)}/>
                                            {this.props.dashboard && <ListItemText primary={t('coin')} secondary={offer.coin}/>}
                                            <ListItemSecondaryAction>
                                                <IconButton disabled={offer.deleting} onClick={() => {this.props.handleDeleteOffer(offer.id)}} edge="end">
                                                    <DeleteIcon color='error'/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                    <Divider/>
                                </div>
                            )) : ''
                        }
                    </CardContent>
                </Card>
            </>
        );
    }
}

export default withRouter(OpenOffer);
