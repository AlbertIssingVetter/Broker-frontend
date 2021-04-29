import React from "react";
import {Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import t from "../../lang/t";
import {numberWithCommas} from "../../utils/tools";
import {withTheme} from "@material-ui/core/styles";

class Offers extends React.Component {

    render() {
        return (
            <TableContainer component={Card}>
                <Table size='small'>
                    <TableHead style={{backgroundColor: this.props.buy ?
                            this.props.theme.palette.success.main : this.props.theme.palette.error.main}}>
                        <TableRow>
                            <TableCell align='center' style={{fontWeight: 'bold', color: this.props.buy ?
                                    this.props.theme.palette.success.contrastText : this.props.theme.palette.error.contrastText}} component="th">{t('unitPrice')}</TableCell>
                            <TableCell align='center'  style={{fontWeight: 'bold', color: this.props.buy ?
                                    this.props.theme.palette.success.contrastText : this.props.theme.palette.error.contrastText}} component="th">{t('coinAmount')}</TableCell>
                            <TableCell align='center'  style={{fontWeight: 'bold', color: this.props.buy ?
                                    this.props.theme.palette.success.contrastText : this.props.theme.palette.error.contrastText}} component="th">{t('totalPrice')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.offers && this.props.offers.map((row) => (
                            <TableRow key={row.price}>
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

export default withTheme(Offers);
