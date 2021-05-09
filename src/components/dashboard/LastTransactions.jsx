import React from "react";
import {Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import t from "../../lang/t";
import {numberWithCommas} from "../../utils/tools";
import {withTheme} from "@material-ui/core/styles";

class LastTransactions extends React.Component {

    render() {
        return (

            <Card>
                <CardContent>
                    <Typography variant="h4">{t('yourLastTransactions')}</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('time')}</TableCell>
                                    <TableCell>{t('market')}</TableCell>
                                    <TableCell>{t('type')}</TableCell>
                                    <TableCell>{t('unitPrice')}</TableCell>
                                    <TableCell>{t('volume')}</TableCell>
                                    <TableCell>{t('totalPrice')}</TableCell>
                                    <TableCell>{t('fee')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.transactions && this.props.transactions.map(transaction =>
                                        <TableRow>
                                            <TableCell>{new Date(transaction.time).getHours() + ':' + new Date(transaction.time).getMinutes()}</TableCell>
                                            <TableCell>{transaction.coin}</TableCell>
                                            <TableCell style={{color: transaction.type ?
                                                    this.props.theme.palette.success.main :
                                                    this.props.theme.palette.error.main}}>{transaction.type ? t('buy') : t('sell')}</TableCell>
                                            <TableCell>{numberWithCommas(transaction.price)}</TableCell>
                                            <TableCell>{numberWithCommas(transaction.volume)}</TableCell>
                                            <TableCell>{numberWithCommas(transaction.total)}</TableCell>
                                            <TableCell>{numberWithCommas(transaction.fee)}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        );
    }
}

export default withTheme(LastTransactions);
