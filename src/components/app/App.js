import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "../login/Signup";
import Login from "../login/Login";
import ForgetPassword from "../login/ForgetPassword";
import Main from "../main/Main";
import {Helmet} from "react-helmet";
import {setShowNetErrorDialog, setHideNetErrorDialog} from '../../utils/axiosDefault'
import t, {getLang} from "../../lang/t";
import {
    Button, Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import ForgetPasswordCode from "../login/ForgetPasswordCode";
//findDOMNode is deprecated in StrictMode error can fixed with unstable_createMuiStrictModeTheme as createMuiTheme
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import IosInstallationGuide from "../install/IosInstallationGuide";
import Callback from "../callback/Callback";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            darkMode: localStorage.getItem('darkMode') === 'true',
            netErrorDialog: false,
        }
        setShowNetErrorDialog(this.showNetErrorDialog);
        setHideNetErrorDialog(this.hideNetErrorDialog);
    }

    showNetErrorDialog = (handleRetryClick) => {
        this.handleRetryClick = handleRetryClick;
        this.setState({netErrorDialog: true})
    }

    hideNetErrorDialog = () => {
        this.handleRetryClick = null;
        this.setState({netErrorDialog: false})
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
                    main: this.state.darkMode? '#1976d2' : '#2196f3',
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
                        <Route path="/callback" component={Callback}/>
                        <Route path="/forget-password" component={ForgetPassword}/>
                        <Route path="/forget-password-code" component={ForgetPasswordCode}/>
                        <Route path="/ios-installation-guide">
                            <Container>
                                <IosInstallationGuide/>
                            </Container>
                        </Route>
                        <Route path="/">
                            <Main toggleDarkMode={this.toggleDarkMode} getDarkMode={this.state.darkMode}/>
                        </Route>
                    </Switch>
                </Router>
                <Dialog open={this.state.netErrorDialog}>
                    <DialogTitle id="net-error-dialog-title">{t('networkErrorTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="net-error-dialog-description">
                            {t('networkErrorDescription')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRetryClick} color="primary">
                            {t('retry')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        );
    }
}
