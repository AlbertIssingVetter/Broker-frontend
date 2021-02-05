import React from "react";
import {Link, withRouter} from 'react-router-dom';
import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import t from "../../lang/t";
import HomeIcon from "@material-ui/icons/Home";
import Logout from "../login/Logout";
import LanguageSelector from "../langauge-selector/LanguageSelector";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import withWidth from '@material-ui/core/withWidth';

class Sidebar extends React.Component {


    render() {
        return (
            <>
                <AppBar
                    position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerToggle}
                            edge="start">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {t('appName')}
                        </Typography>
                        <Logout variant='text'/>
                        <LanguageSelector />
                    </Toolbar>
                </AppBar>
                <Drawer variant={this.props.width === 'xs' ? 'temporary' : 'persistent'}
                        anchor='left' open={this.props.drawerOpen} onClose={this.props.handleDrawerClose}>
                    <List>
                        <Link onClick={this.props.width === 'xs' ? this.props.handleDrawerClose : ''} className='sidebar-link' to='/'>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={t('home')}/>
                            </ListItem>
                        </Link>
                    </List>
                    <List>
                        <Link onClick={this.props.width === 'xs' ? this.props.handleDrawerClose : ''} className='sidebar-link' to='/profile'>
                            <ListItem button>
                                <ListItemIcon>
                                    <AssignmentIndIcon/>
                                </ListItemIcon>
                                <ListItemText primary={t('profile')}/>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </>
        );
    }
}

export default withRouter(withWidth()(Sidebar));
