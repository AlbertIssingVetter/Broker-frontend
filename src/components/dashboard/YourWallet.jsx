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
    TableRow
} from "@material-ui/core";
import {Doughnut} from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";
import t from "../../lang/t";
import coins from "../../utils/coins";
import {numberWithCommas} from "../../utils/tools";

class YourWallet extends React.Component {

    render() {
        let total = 0;
        if (this.props.wallets) {
            Object.keys(this.props.wallets).forEach(wallet => {
                total += this.props.wallets[wallet].irrAsset;
            });
        }
        return (
            <Card style={{height: '100%'}}>
                <CardContent>
                    <Typography variant="h4">
                        {t('yourWallet')}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Doughnut type='doughnut' data={{
                                labels: this.props.wallets ? Object.keys(this.props.wallets).map(wallet => wallet).splice(0, 6) : [],
                                datasets: [{
                                    data: this.props.wallets ? Object.keys(this.props.wallets).map(wallet => this.props.wallets[wallet].irrAsset).splice(0, 6) : [],
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
                            <TableContainer style={{height: '260px'}}>
                                <Table size='small'>
                                    <TableBody>
                                        {
                                            this.props.wallets && Object.keys(this.props.wallets).map(wallet => (
                                                <TableRow>
                                                    <TableCell>{wallet === 'irr' ? t('toman') : coins[wallet].name}</TableCell>
                                                    <TableCell>{numberWithCommas(this.props.wallets[wallet].balance)}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>{t('yourEstimateAsset', numberWithCommas(total))}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(YourWallet);
