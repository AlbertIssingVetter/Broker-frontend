import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {Doughnut} from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";
import t from "../../lang/t";
import coins from "../../utils/coins";
import {numberWithCommas} from "../../utils/tools";

class YourWallet extends React.Component {

    render() {
        return (
            <Card style={{height: '100%'}}>
                <CardContent>
                    <Typography variant="h4">
                        {t('yourWallet')}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Doughnut type='doughnut' data={{
                                labels: ['btc', 'eth', 'bnb', 'ali', 'doge', 'irr'],
                                datasets: [{
                                    data: [120000, 19000, 13000, 25000, 11100, 123000],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.4)',
                                        'rgba(54, 162, 235, 0.4)',
                                        'rgba(255, 206, 86, 0.4)',
                                        'rgba(75, 192, 192, 0.4)',
                                        'rgba(153, 102, 255, 0.4)',
                                        'rgba(255, 159, 64, 0.4)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1,
                                }]
                            }} options={
                                {
                                    plugins: {
                                        legend: {
                                            display: false
                                        },
                                    }
                                }
                            }/>
                        </Grid>
                        <Grid item xs={6}>
                            <TableContainer>
                                <Table size='small'>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{coins.btc.name}</TableCell>
                                            <TableCell>{numberWithCommas(0.0002107)}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>{coins.eth.name}</TableCell>
                                            <TableCell>{numberWithCommas(0.1)}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>{coins.bnb.name}</TableCell>
                                            <TableCell>{numberWithCommas(1.23)}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>{coins.ali.name}</TableCell>
                                            <TableCell>{numberWithCommas(1238564.21)}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>{coins.doge.name}</TableCell>
                                            <TableCell>{numberWithCommas(125678)}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>{t('toman')}</TableCell>
                                            <TableCell>{numberWithCommas(123856400)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(YourWallet);
