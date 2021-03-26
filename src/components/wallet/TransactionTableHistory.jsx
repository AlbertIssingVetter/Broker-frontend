import React from "react";
import {withRouter} from 'react-router-dom';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import t from "../../lang/t";

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
                            <TableRow key={transaction.name}>
                                <TableCell align="center" component="th" scope="row">{transaction.date}</TableCell>
                                <TableCell align="center">{transaction.address}</TableCell>
                                <TableCell align="center">{transaction.volume}</TableCell>
                                <TableCell align="center">{transaction.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withRouter(TransactionTableHistory);
