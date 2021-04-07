import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(r => {
            console.log('service worker registered');
        }).catch(e => {
        console.error(e);
    });
}
