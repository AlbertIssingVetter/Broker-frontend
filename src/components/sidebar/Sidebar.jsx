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
    Toolbar, Tooltip,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import t from "../../lang/t";
import HomeIcon from "@material-ui/icons/Home";
import LanguageSelector from "../langauge-selector/LanguageSelector";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import withWidth from '@material-ui/core/withWidth';
import ProfileDropDown from "../main/ProfileDropDown";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MarketSidebar from "./MarketSidebar";

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
                        <Tooltip title={t('toggleDarkModeTheme')}>
                            <IconButton
                                aria-label="toggle theme change"
                                onMouseDown={this.props.toggleDarkMode}
                                className='MuiAppBar-colorPrimary dark-mode-selector'>
                                {this.props.getDarkMode ? <Brightness4Icon/> : <Brightness7Icon/>}
                            </IconButton>
                        </Tooltip>
                        <LanguageSelector className="language-selector-header" />
                        <ProfileDropDown/>
                    </Toolbar>
                </AppBar>
                <Drawer variant={this.props.width === 'xs' ? 'temporary' : 'persistent'}
                        anchor='left' open={this.props.drawerOpen} onClose={this.props.handleDrawerClose}>
                    <List>
                        <Link onClick={this.props.width === 'xs' ? this.props.handleDrawerClose : null} className='no-link' to='/'>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={t('home')}/>
                            </ListItem>
                        </Link>
                    </List>
                    <List>
                        <Link onClick={this.props.width === 'xs' ? this.props.handleDrawerClose : null} className='no-link' to='/profile'>
                            <ListItem button>
                                <ListItemIcon>
                                    <AssignmentIndIcon/>
                                </ListItemIcon>
                                <ListItemText primary={t('profile')}/>
                            </ListItem>
                        </Link>
                    </List>
                    <List>
                        <Link onClick={this.props.width === 'xs' ? this.props.handleDrawerClose : null} className='no-link' to='/wallet'>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountBalanceWalletIcon/>
                                </ListItemIcon>
                                <ListItemText primary={t('myWallet')}/>
                            </ListItem>
                        </Link>
                    </List>
                    <MarketSidebar handleDrawerClose={this.props.handleDrawerClose} width={this.props.width}/>
                </Drawer>
            </>
        );
    }
}

export default withRouter(withWidth()(Sidebar));
