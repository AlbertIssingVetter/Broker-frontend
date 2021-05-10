import React from "react";
import {withRouter} from 'react-router-dom';

class TradingViewWidget extends React.Component {

    componentDidMount() {
        // eslint-disable-next-line no-undef
        const widget = new TradingView.widget(
            {
                "autosize": true,
                "symbol": "binance:ethusdt",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "container_id": "tradingview-id"
            }
        );
    }

    render() {
        return (
            <>
                <div className="tradingview-widget-container">
                    <div id="tradingview-id"/>
                    <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
                </div>
            </>
        );
    }
}

export default withRouter(TradingViewWidget);
