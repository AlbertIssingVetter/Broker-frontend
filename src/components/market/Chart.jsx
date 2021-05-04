import React from "react";
import {Card, CardContent, Hidden, withTheme} from "@material-ui/core";
import t from "../../lang/t";
import {numberWithCommas} from "../../utils/tools";
import {Alert} from "@material-ui/lab";
import DepthContrast from "./DepthContrast";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';


class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        // const chart = createChart(this.chartRef.current, {
        //     width: this.chartRef.offsetWidth,
        //     height: 300,
        //     layout: {
        //         backgroundColor: this.props.theme.palette.background.paper,
        //         textColor: this.props.theme.palette.text.primary,
        //     },
        // });
        // const candlestickSeries = chart.addCandlestickSeries();
        //
        // candlestickSeries.setData(this.props.chartData);
    }



    render() {
        return (
            <Card className='chart'>
                <CardContent>
                    {
                        this.props.price? (
                            <>
                                <div className='market-price'>
                                    <Alert icon={false} severity={this.props.price ? (this.props.price.percent < 0 ? 'error' : 'success') : ''}>
                                        {t('compareToYesterday', this.props.price? Math.round(this.props.price.percent*100)/100 : 0)}
                                    </Alert>
                                </div>
                                <Hidden xsDown>
                                    <div className='market-price'>
                                        {t('lastPrice') + ' ' + numberWithCommas(this.props.price.last)}
                                    </div>
                                    <div className='market-price'>
                                        {t('minPrice') + ' '}
                                        <span style={{color: this.props.theme.palette.error.main}}>{numberWithCommas(this.props.price.min)}</span>
                                    </div>
                                    <div className='market-price'>
                                        {t('maxPrice') + ' '}
                                        <span style={{color: this.props.theme.palette.success.main}}>{numberWithCommas(this.props.price.max)}</span>
                                    </div>
                                    <div className='market-price'>
                                        {t('turnover') + ' ' + numberWithCommas(this.props.price.turnover)}
                                    </div>
                                </Hidden>
                            </>
                        ) : ''
                    }
                    <div style={{direction: 'ltr'}} ref={this.chartRef}/>
                    <TradingViewWidget
                        symbol={`BINANCE:${this.props.coin === 'ali' ? 'ETH' : this.props.coin}USDT`}
                        theme={this.props.getDarkMode ? Themes.DARK : Themes.LIGHT}
                        locale="fa_IR"
                        autosize
                        allow_symbol_change={false}
                        range='2D'
                        hide_side_toolbar={false}
                        interval={60}
                    />
                    {
                        this.props.depthContrast ? <DepthContrast depthContrast={this.props.depthContrast}/> : ''
                    }
                </CardContent>
            </Card>
        );
    }
}

export default withTheme(Chart);
