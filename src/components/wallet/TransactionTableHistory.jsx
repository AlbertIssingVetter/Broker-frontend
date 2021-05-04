import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from "@material-ui/core";
import t, {getLang} from "../../lang/t";
import {numberWithCommas} from "../../utils/tools";
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {withTheme} from "@material-ui/core/styles";

class TransactionTableHistory extends React.Component {

    render() {
        return (
            <TableContainer component={Paper} className="language-direction">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t('date')}</TableCell>
                            <TableCell align="center">{t('address')}</TableCell>
                            <TableCell align="center">{t('transactionVolume')}</TableCell>
                            <TableCell align="center">{t('status')}</TableCell>
                            <TableCell align="center">{t('description')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.transactions.map((transaction) => (
                            <TableRow key={transaction.date}>
                                <TableCell align="center" component="th" scope="row">
                                    {new Date(transaction.date)
                                        .toLocaleString(getLang() === 'fa' ? 'fa' : 'en-US')}
                                </TableCell>
                                <TableCell align="center">{transaction.address}</TableCell>
                                <TableCell align="center">{numberWithCommas(transaction.amount)}</TableCell>
                                <TableCell align="center">
                                    {
                                        ((transaction.status === "0" || transaction.status === "2" || transaction.status === "-2") && Date.now() - 240 * 60 < transaction.date)
                                        && (
                                            <Tooltip title={t('paymentWaiting')}>
                                                <WarningIcon style={{color: this.props.theme.palette.warning.main}}/>
                                            </Tooltip>
                                        )
                                    }

                                    {
                                        (transaction.status === "-1" || ((transaction.status === "0" || transaction.status === "2") && Date.now() - 240 * 60 >= transaction.date))
                                        && (
                                            <Tooltip title={t('paymentError')}>
                                                <ErrorIcon  style={{color: this.props.theme.palette.error.main}}/>
                                            </Tooltip>
                                        )
                                    }

                                    {
                                        transaction.status === "1" && (
                                            <Tooltip title={t('paymentSuccess')}>
                                                <CheckCircleIcon  style={{color: this.props.theme.palette.success.main}}/>
                                            </Tooltip>)
                                    }
                                </TableCell>
                                <TableCell align="center">{transaction.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withTheme(TransactionTableHistory);
