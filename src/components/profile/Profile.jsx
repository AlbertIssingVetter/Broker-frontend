import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
    Grid, IconButton, Input, InputAdornment,
    Table, TableBody, TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import t from "../../lang/t";
import {Skeleton} from "@material-ui/lab";
import axios from "axios";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            dialogEmailVerificationError: false,
            dialogMobileVerificationError: false,
        }
    }

    componentDidMount() {
        axios({
            url: '/user/profile',
            method: 'POST',
        }).then(res => {
            this.setState({
                loading: false,
                user: res.data
            })
        })
    }

    handleMailVerificationClick = () => {
        this.setState({dialogMailVerificationError: true})
    }

    handleDialogMailClose = () => {
        this.setState({dialogMailVerificationError: false})
    }


    handleMobileVerificationClick = () => {
        this.setState({dialogMobileVerificationError: true})
    }

    handleDialogMobileClose = () => {
        this.setState({dialogMobileVerificationError: false})
    }


    render() {
        return (
            <Grid container spacing={3} className='profile'>
                <Grid item sm={12} md={6}>
                    <Card className='profile-profile'>
                        <CardContent>
                            <Typography className='header' variant="h4">{t('profile')}</Typography>
                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('mail')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <FormControl>
                                                <Input
                                                    defaultValue={this.state.user.mail}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={this.handleMailVerificationClick}>
                                                                {this.state.user.mail_verify ? <CheckCircleIcon color='secondary'/> : <ErrorIcon color='error'/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }/>
                                            </FormControl>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('firstName')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <TextField defaultValue={this.state.user.name}/>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('lastName')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <TextField defaultValue={this.state.user.family}/>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('nationalCode')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <TextField defaultValue={this.state.user.nationalCode}/>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('mobile')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <FormControl>
                                                <Input
                                                    defaultValue={this.state.user.mob}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={this.handleMobileVerificationClick}>
                                                                {this.state.user.mob_verify ? <CheckCircleIcon color='secondary'/> : <ErrorIcon color='error'/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }/>
                                            </FormControl>
                                    }
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions className='actions'>
                            <Button variant='contained' color="primary">{t('save')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography className='header' variant="h4">{t('financialInformation')}</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t('bank')}</TableCell>
                                        <TableCell>{t('cardNumber')}</TableCell>
                                        <TableCell>{t('status')}</TableCell>
                                        <TableCell>{t('operation')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.user.cardNumbers ? this.state.user.cardNumbers.map(cardNumber => (
                                        <TableRow>
                                            <TableCell>{cardNumber.bank}</TableCell>
                                            <TableCell>{cardNumber.number}</TableCell>
                                            <TableCell>{cardNumber.status}</TableCell>
                                            <TableCell><DeleteIcon/></TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell className="no-item" colSpan={4}>{t('noItem')}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <br/>
                            <Button variant='contained' color='primary'>{t('add')}</Button>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t('bankAccount')}</TableCell>
                                        <TableCell>{t('status')}</TableCell>
                                        <TableCell>{t('operation')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.user.bankAccounts ? this.state.user.bankAccounts.map(bankAccount => (
                                        <TableRow>
                                            <TableCell>{bankAccount.number}</TableCell>
                                            <TableCell>{bankAccount.status}</TableCell>
                                            <TableCell><DeleteIcon/></TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell className="no-item" colSpan={4}>{t('noItem')}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <br/>
                            <Button variant='contained' color='primary'>{t('add')}</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography className='header' variant="h4">{t('furtherInformation')}</Typography>
                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('address')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <TextField defaultValue={this.state.user.address}/>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('tel')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <TextField defaultValue={this.state.user.tel}/>
                                    }
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' color='primary'>{t('save')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Dialog
                    open={this.state.dialogMailVerificationError}
                    onClose={this.handleDialogMailClose}
                >
                    <DialogTitle>{t('mailVerificationDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('mailVerificationDialogContent')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogMailClose}>
                            {t('later')}
                        </Button>
                        <Button onClick={this.handleDialogMailClose} color="primary">
                            {t('sendCode')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.dialogMobileVerificationError}
                    onClose={this.handleDialogMobileClose}
                >
                    <DialogTitle>{t('mobileVerificationDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('mobileVerificationDialogContent')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogMobileClose}>
                            {t('later')}
                        </Button>
                        <Button onClick={this.handleDialogMobileClose} color="primary">
                            {t('sendCode')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}

export default withRouter(Profile);
