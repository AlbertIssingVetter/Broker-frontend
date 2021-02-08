import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
//findDOMNode is deprecated in StrictMode error can fixed with unstable_createMuiStrictModeTheme as createMuiTheme
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {getLang} from "./lang/t";

const theme = createMuiTheme({
    direction: getLang() === 'fa' ? 'rtl' : 'ltr',
    palette: {
        type: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light',
        primary: {
            light: '#226CFC',
            main: '#226CFC',
        },
        secondary: {
            light: '#0859FC',
            main: '#0859FC',
        },
        error: {
            light: '#FC3A95',
            main: '#FC3A95',
        },
        warnings: {
            light: '#FCB108',
            main: '#FCB108',
        },
        success: {
            light: '#14FC19',
            main: '#14FC19',
        },
    },
    typography: {
        fontFamily: 'Vazir',
    }
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
