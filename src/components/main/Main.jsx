import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import {Container} from "@material-ui/core";
import Profile from "../profile/Profile";
import {getLang} from "../../lang/t";
import withWidth from "@material-ui/core/withWidth";
import Wallet from "../wallet/Wallet";
import Market from "../market/Market";
import Withdraw from "../wallet/Withdraw";
import WalletDetails from "../wallet/WalletDetails";
import Setting from "../setting/Setting";
import IRRWallet from "../wallet/IRRWallet";
import IRRDeposit from "../wallet/IRRDeposit";
import IRRWithdraw from "../wallet/IRRWithdraw";

class Main extends React.Component {

    constructor(props) {
        super(props)
        const drawerOpen = props.width === 'xs' ? false : localStorage.getItem('drawerOpen') != null ? localStorage.getItem('drawerOpen') === 'true' : true
        this.state = {
            drawerOpen,
        }
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login')
        }

    }

    handleDrawerOpen = () => {
        localStorage.setItem('drawerOpen', 'true');
        this.setState({drawerOpen: true})
    }

    handleDrawerToggle = () => {
        localStorage.setItem('drawerOpen', `${!this.state.drawerOpen}`);
        this.setState({drawerOpen: !this.state.drawerOpen})
    }

    handleDrawerClose = () => {
        localStorage.setItem('drawerOpen', 'false');
        this.setState({drawerOpen: false})
    }

    render() {
        let styles = {}
        if (this.props.width !== 'xs') {
            if (getLang() === 'fa') {
                styles = {
                    marginRight: this.state.drawerOpen ? '12.5rem': '0',
                    width: this.state.drawerOpen ? 'calc(100% - 12.5rem)': '100%'
                }
            } else {
                styles = {
                    marginLeft: this.state.drawerOpen ? '12.5rem': '0',
                    width: this.state.drawerOpen ? 'calc(100% - 12.5rem)': '100%'
                }
            }
        }
        styles.marginTop = '1rem';
        styles.maxWidth = '100%';
        return <div className='main'>

            <Sidebar handleDrawerClose={this.handleDrawerClose} drawerOpen={this.state.drawerOpen}
                     handleDrawerToggle={this.handleDrawerToggle} getDarkMode={this.props.getDarkMode}
                     toggleDarkMode={this.props.toggleDarkMode} />
            <Switch>
                <Route path="/profile">
                    <Container style={styles}>
                        <Profile/>
                    </Container>
                </Route>
                <Route path="/wallet/irr/deposit">
                    <Container style={styles}>
                        <IRRDeposit/>
                    </Container>
                </Route>
                <Route path="/wallet/irr/withdraw">
                    <Container style={styles}>
                        <IRRWithdraw/>
                    </Container>
                </Route>
                <Route path="/wallet/:coinId/withdraw">
                    <Container style={styles}>
                        <Withdraw/>
                    </Container>
                </Route>
                <Route path="/wallet/irr">
                    <Container style={styles}>
                        <IRRWallet/>
                    </Container>
                </Route>
                <Route path="/wallet/:coinId">
                    <Container style={styles}>
                        <WalletDetails/>
                    </Container>
                </Route>
                <Route path="/wallet">
                    <Container style={styles}>
                        <Wallet/>
                    </Container>
                </Route>
                <Route path="/market/:marketId">
                    <Container style={styles}>
                        <Market getDarkMode={this.props.getDarkMode}/>
                    </Container>
                </Route>
                <Route path="/setting">
                    <Container style={styles}>
                        <Setting getDarkMode={this.props.getDarkMode}
                                 toggleDarkMode={this.props.toggleDarkMode}/>
                    </Container>
                </Route>
                <Route path="/">
                    <Container style={styles}>
                        <Dashboard/>
                    </Container>
                </Route>
            </Switch>
        </div>
    }
}

export default withRouter(withWidth()(Main));
