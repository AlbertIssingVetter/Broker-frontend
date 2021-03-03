import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "../login/Signup";
import Login from "../login/Login";
import ForgetPassword from "../login/ForgetPassword";
import Main from "../main/Main";
import {Helmet} from "react-helmet";
import {} from '../../utils/axiosDefault'
import {getLang} from "../../lang/t";
import {CssBaseline} from "@material-ui/core";
import ForgetPasswordCode from "../login/ForgetPasswordCode";
//findDOMNode is deprecated in StrictMode error can fixed with unstable_createMuiStrictModeTheme as createMuiTheme
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            darkMode: localStorage.getItem('darkMode') === 'true',
        }
    }

    toggleDarkMode = () => {
        localStorage.setItem('darkMode', !this.state.darkMode)
        this.setState({darkMode: !this.state.darkMode})
    }

    render() {
        const theme = createMuiTheme({
            direction: getLang() === 'fa' ? 'rtl' : 'ltr',
            palette: {
                type: this.state.darkMode ? 'dark' : 'light',
                primary: {
                    main: this.state.darkMode? '#113A8A' : '#226CFC',
                },
                secondary: {
                    main: '#0859FC',
                },
                error: {
                    main: '#FC3A95',
                },
                warnings: {
                    main: '#FCB108',
                },
                success: {
                    main: '#14FC19',
                },
            },
            typography: {
                fontFamily: 'Vazir',
            }
        });
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <CssBaseline/>
                    <Helmet>
                        <link rel="stylesheet"
                              href={getLang() === 'fa' ? '/style.rtl.css' : '/style.css'}/>
                    </Helmet>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/forget-password" component={ForgetPassword}/>
                        <Route path="/forget-password-code" component={ForgetPasswordCode}/>
                        <Route path="/">
                            <Main toggleDarkMode={this.toggleDarkMode} getDarkMode={this.state.darkMode}/>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
}
