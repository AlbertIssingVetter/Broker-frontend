import React from "react";
import Typography from "@material-ui/core/Typography";
import t, {getLang} from "../../lang/t";
import {
    Backdrop,
    Card, CircularProgress, FormControl, InputLabel, MenuItem, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import CircularProgressWithLabel from "../circular-progress-with-label/CircularProgressWithLabel";
import axios from "axios";
import {numberWithCommas} from "../../utils/tools";
import {withTheme} from "@material-ui/core/styles";
import coins from "../../utils/coins";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            histories: [],
            page: 0,
            rowsPerPage: 10,
            count: 0,
            coin: '',
            reference: ['irr', 'usdt'],
            loading: false,
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        }, this.getData);
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
        }, this.getData);
    }

    getData = () => {
        this.setState({loading: true})
        axios({
            url: '/history',
            method: 'POST',
            data: {
                coin: this.state.coin,
                reference: this.state.reference.length === 2 ? '' : this.state.reference[0],
                page: this.state.page,
                limit: this.state.rowsPerPage,
            }
        }).then(res => {
            this.setState({loading: false})
            if (res.data.status) {
                const histories = []
                Object.keys(res.data.data.history).forEach(key => {
                    const offer = res.data.data.history[key];
                    const history = {
                        ...offer[0],
                        fee: 0,
                        totalPrice: 0,
                    }
                    delete history.coinVolume;
                    delete history.referenceVolume;
                    delete history.coinFee;
                    delete history.referenceFee;
                    delete history.transactionsPrice;
                    offer.forEach(transaction => {
                        history.fee += history.type === "0" ?
                            Number(transaction.referenceFee) * Number(transaction.referenceVolume) :
                            Number(transaction.coinFee) * Number(transaction.coinVolume);
                        history.totalPrice += (Number(transaction.coinVolume) * Number(transaction.transactionsPrice));
                    })
                    console.log(history)
                    histories.push(history);
                })
                this.setState({
                    histories,
                    count: res.data.data.count
                })
            } else {

            }
        }).catch(err => {
            this.setState({loading: false})
        })
    }

    componentDidMount() {
        this.getData();
    }

    handleChangeCoin = (event) => {
        this.setState({coin: event.target.value}, this.getData)
    }

    handleChangeReference = (event, reference) => {
        if (reference.length) {
            this.setState({reference: reference}, this.getData)
        }
    }

    render() {
        return (
            <>
                <div className="history-filter">
                    <FormControl>
                        <InputLabel>{t('coin')}</InputLabel>
                        <Select
                            value={this.state.coin}
                            onChange={this.handleChangeCoin}>
                            <MenuItem value="">
                                <em>{t('all')}</em>
                            </MenuItem>
                            {
                                Object.keys(coins).map((coin)=>
                                    <MenuItem key={coin} value={coin}>{coins[coin].name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <ToggleButtonGroup onChange={this.handleChangeReference}
                                       value={this.state.reference} className='select-reference'>
                        <ToggleButton value="irr">
                            {t('toman')}
                        </ToggleButton>
                        <ToggleButton value="usdt">
                            {t('tether')}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <Typography variant="h3" gutterBottom>{t('history')}</Typography>
                <TableContainer component={Card}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>{t('filled')}</TableCell>
                                <TableCell align='center'>{t('date')}</TableCell>
                                <TableCell align='center'>{t('market')}</TableCell>
                                <TableCell align='center'>{t('type')}</TableCell>
                                <TableCell align='center'>{t('unitPrice')}</TableCell>
                                <TableCell align='center'>{t('averagePrice')}</TableCell>
                                <TableCell align='center'>{t('amount')}</TableCell>
                                <TableCell align='center'>{t('totalPrice')}</TableCell>
                                <TableCell align='center'>{t('fee')}</TableCell>
                                <TableCell align='center'>{t('status')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.histories.map(history =>
                                    <TableRow key={history.offerID}>
                                        <TableCell align='center'>
                                            <CircularProgressWithLabel
                                                color={history.type === '0' ? 'error' : 'success'}
                                                value={Number(history.used * 100 / history.volume)}/>
                                        </TableCell>
                                        <TableCell align='center'>{new Date(history.offerTime)
                                            .toLocaleString(getLang() === 'fa' ? 'fa' : 'en-US')}</TableCell>
                                        <TableCell
                                            align='center'>{history.coin + ' - ' + history.reference}</TableCell>
                                        <TableCell
                                            align='center'>{history.type === "1" ? t('buy') : t('sell')}</TableCell>
                                        <TableCell align='center'>{numberWithCommas(history.price)}</TableCell>
                                        <TableCell align='center'>
                                            {
                                                Number(history.used) === 0 ? '-' : numberWithCommas(history.totalPrice / history.used)
                                            }
                                        </TableCell>
                                        <TableCell align='center'>{numberWithCommas(history.volume)}</TableCell>
                                        <TableCell align='center'>{Number(history.used) === 0 ? '-' : numberWithCommas(history.totalPrice)}</TableCell>
                                        <TableCell align='center'>{Number(history.used) === 0 ? '-' : numberWithCommas(history.fee)}</TableCell>
                                        <TableCell align='center' style={{
                                            color: history.status === "0" ?
                                                this.props.theme.palette.warning.main :
                                                (history.status === "1" ? this.props.theme.palette.success.main :
                                                    this.props.theme.palette.error.main)
                                        }}>
                                            {
                                                history.status === "0" ?
                                                    t('waiting') :
                                                    (history.status === "1" ? t('finished') :
                                                        t('cancelled'))
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    labelRowsPerPage={t('rowsPerPage')}
                    labelDisplayedRows={({from, to, count}) => t('labelDisplayedRows', from, to, count)}
                    component="div"
                    count={this.state.count}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <Backdrop style={{zIndex: 1100}} open={this.state.loading}>
                    <CircularProgress color="primary"/>
                </Backdrop>
            </>
        );
    }
}

export default withTheme(History);
