import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import {Container} from "@material-ui/core";
import Profile from "../profile/Profile";

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            drawerOpen: false
        }
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login')
        }

    }

    handleDrawerOpen = () => {
        this.setState({drawerOpen: true})
    }

    handleDrawerToggle = () => {
        this.setState({drawerOpen: !this.state.drawerOpen})
    }

    handleDrawerClose = () => {
        this.setState({drawerOpen: false})
    }

    render() {
        return <div className='main'>

            <Sidebar handleDrawerClose={this.handleDrawerClose} drawerOpen={this.state.drawerOpen}
                     handleDrawerToggle={this.handleDrawerToggle} />
            <Switch>
                <Route path="/profile">
                    <Container style={{marginLeft: this.state.drawerOpen ? '12.5rem': '0', width: this.state.drawerOpen ? 'calc(100% - 12.5rem)': '100%'}}>
                        <Profile/>
                    </Container>
                </Route>
                <Route path="/">
                    <Container style={{marginLeft: this.state.drawerOpen ? '12.5rem': '0', width: this.state.drawerOpen ? 'calc(100% - 12.5rem)': '100%'}}>
                        <Dashboard/>
                    </Container>
                </Route>
            </Switch>
        </div>
    }
}

export default withRouter(Main);
