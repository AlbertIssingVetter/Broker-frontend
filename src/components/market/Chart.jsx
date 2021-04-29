import React from "react";
import {Card, CardContent, withTheme} from "@material-ui/core";
import {createChart} from "lightweight-charts";
import t from "../../lang/t";
import {numberWithCommas} from "../../utils/tools";
import {Alert, ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import DepthContrast from "./DepthContrast";


class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const chart = createChart(this.chartRef.current, {
            width: this.chartRef.offsetWidth,
            height: 300,
            layout: {
                backgroundColor: this.props.theme.palette.background.paper,
                textColor: this.props.theme.palette.text.primary,
            },
        });
        const candlestickSeries = chart.addCandlestickSeries();

        candlestickSeries.setData(this.props.chartData);
    }



    render() {
        return (
            <Card className='chart'>
                <CardContent>
                    {
                        this.props.price? (
                            <>
                                <ToggleButtonGroup onChange={this.props.handleChangeReference} exclusive
                                                   value={this.props.reference} className='select-reference'>
                                    <ToggleButton value="irr">
                                        {t('toman')}
                                    </ToggleButton>
                                    <ToggleButton value="usdt">
                                        {t('tether')}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <div className='market-price'>
                                    <Alert icon={false} severity={this.props.price ? (this.props.price.percent < 0 ? 'error' : 'success') : ''}>
                                        {t('compareToYesterday', this.props.price? this.props.price.percent : 0)}
                                    </Alert>
                                </div>
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
                            </>
                        ) : ''
                    }
                    <div style={{direction: 'ltr'}} ref={this.chartRef}/>
                    {
                        this.props.depthContrast ? <DepthContrast depthContrast={this.props.depthContrast}/> : ''
                    }
                </CardContent>
            </Card>
        );
    }
}

export default withTheme(Chart);
