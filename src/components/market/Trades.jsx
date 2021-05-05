import React from "react";
import {Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withTheme} from "@material-ui/core";
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
                            <TableRow key={row.price} style={{color: row.color}}>
                                <TableCell style={{color: this.props.theme.palette[row.color].main}}
                                    align='center'>{new Date(row.time).getHours() + ':' + new Date(row.time).getMinutes()}</TableCell>
                                <TableCell align='center' style={{color: this.props.theme.palette[row.color].main}}>{numberWithCommas(row.price)}</TableCell>
                                <TableCell align='center' style={{color: this.props.theme.palette[row.color].main}}>{numberWithCommas(row.volume)}</TableCell>
                                <TableCell align='center' style={{color: this.props.theme.palette[row.color].main}}>{numberWithCommas(row.price * row.volume)}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withTheme(Trades);
