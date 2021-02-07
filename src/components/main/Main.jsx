import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import {Container} from "@material-ui/core";
import Profile from "../profile/Profile";
import {getLang} from "../../lang/t";
import withWidth from "@material-ui/core/withWidth";

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
                     handleDrawerToggle={this.handleDrawerToggle} />
            <Switch>
                <Route path="/profile">
                    <Container style={styles}>
                        <Profile/>
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
