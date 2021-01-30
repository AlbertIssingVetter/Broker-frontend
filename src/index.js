import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction: localStorage.getItem('lang') === 'fa' ? 'rtl' : 'ltr',
    palette: {
        type: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light',
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
