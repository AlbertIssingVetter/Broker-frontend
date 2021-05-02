import React from "react";
import {withRouter} from 'react-router-dom';
import {Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import t from "../../lang/t";
import ColorButton from "../color-button/ColorButton";
import Typography from "@material-ui/core/Typography";
import {numberWithCommas} from "../../utils/tools";

class AccountStatus extends React.Component {

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h4">{t('accountStatus')}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{t('accountLevel')}</TableCell>
                                    <TableCell>
                                        {t('notVerified')}
                                        <Button onClick={() => {this.props.history.push('/profile')}}
                                                style={{margin: '0 10px'}} variant='outlined'
                                                color='primary'>{t('verify')}</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('dailyIRRWithdraw')}</TableCell>
                                    <TableCell>{t('xFromMaxWithdraw', 0, numberWithCommas(300000000))}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('dailyCoinWithdraw')}</TableCell>
                                    <TableCell>{t('xFromMaxWithdraw', 0, numberWithCommas(200000000))}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('dailyTotalWithdraw')}</TableCell>
                                    <TableCell>{t('xFromMaxWithdraw', 0, numberWithCommas(500000000))}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('monthWithdraw')}</TableCell>
                                    <TableCell>{t('xFromMaxWithdraw', 0, numberWithCommas(3000000000))}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t('fee')}</TableCell>
                                    <TableCell>0.035</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>

            </Card>
        );
    }
}

export default withRouter(AccountStatus);
