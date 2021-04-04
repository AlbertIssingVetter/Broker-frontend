import React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import t from "../../lang/t";
import coins from "../../utils/coins";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
class MarketSidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleMarketClick = () => {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <>
                <List>
                    <ListItem button onClick={this.handleMarketClick}>
                        <ListItemIcon>
                            <InsertChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('market')}/>
                        {this.state.open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </ListItem>
                </List>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    {
                        Object.keys(coins).map(coin => (
                            <Link onClick={this.props.width === 'xs' ? this.props.handleDrawerClose : null}
                                  key={coin} className='no-link' to={`/market/${coin}`}>
                                <ListItem button>
                                    <ListItemIcon>
                                        {coins[coin].icon}
                                    </ListItemIcon>
                                    <ListItemText primary={coins[coin].name}/>
                                </ListItem>
                            </Link>
                        ))
                    }
                </Collapse>
            </>
        );
    }
}

export default withRouter(MarketSidebar);
