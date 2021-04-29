import React from "react";
import {withRouter} from 'react-router-dom';
import {Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import t from "../../lang/t";
import {numberWithCommas} from "../../utils/tools";

class Trades extends React.Component {

    render() {
        return (
            <TableContainer component={Card}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>{t('time')}</TableCell>
                            <TableCell align='center'>{t('unitPrice')}</TableCell>
                            <TableCell align='center'>{t('coinAmount')}</TableCell>
                            <TableCell align='center'>{t('totalPrice')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.trades && this.props.trades.map((row) => (
                            <TableRow key={row.price}>
                                <TableCell align='center'>{numberWithCommas(row.date)}</TableCell>
                                <TableCell align='center'>{numberWithCommas(row.price)}</TableCell>
                                <TableCell align='center'>{numberWithCommas(row.volume)}</TableCell>
                                <TableCell align='center'>{numberWithCommas(row.price * row.volume)}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withRouter(Trades);
