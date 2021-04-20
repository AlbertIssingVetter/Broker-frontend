import React from "react";
import {withRouter} from 'react-router-dom';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import t, {getLang} from "../../lang/t";
import {numberWithCommas} from "../../utils/tools";
import {Alert} from "@material-ui/lab";

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
                            <TableCell align="center">{t('description')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.transactions.map((transaction) => (
                            <TableRow key={transaction.date}>
                                <TableCell align="center" component="th" scope="row">
                                    {new Date(transaction.date * 1000)
                                        .toLocaleString(getLang() === 'fa' ? 'fa' : 'en-US')}
                                </TableCell>
                                <TableCell align="center">{transaction.address}</TableCell>
                                <TableCell align="center">{numberWithCommas(transaction.amount)}</TableCell>
                                <TableCell align="center">
                                    {
                                        (transaction.status === 0 || transaction.status > 1) && (<Alert severity='warning'>{t('paymentWaiting')}</Alert>)
                                    }

                                    {
                                        transaction.status === -1 && (<Alert severity='error'>{t('paymentError')}</Alert>)
                                    }

                                    {
                                        transaction.status === 1 && (<Alert severity='success'>{t('paymentSuccess')}</Alert>)
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withRouter(TransactionTableHistory);
