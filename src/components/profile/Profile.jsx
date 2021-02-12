import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
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
            dialogMailVerificationError: false,
            dialogMobileVerificationError: false,
            apiLoading: false,
            dialogMobileCode: false,
            dialogMailCode: false,
        }
        this.txtMobileCode = React.createRef();
        this.txtMailCode = React.createRef();
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

    handleDialogMobileCodeClose = () => {
        this.setState({dialogMobileCode: false})
    }

    handleDialogMailCodeClose = () => {
        this.setState({dialogMailCode: false})
    }

    sendMailVerificationCode = () => {
        this.setState({apiLoading: true});
        this.handleDialogMailClose();
        axios({
            url: '/user/verify',
            method: 'POST',
            data: {
                type: 'send_mail_code'
            }
        }).then(r => {
            this.setState({apiLoading: false, dialogMailCode: true});
            console.log(r.data);
        }).catch(e => {
            this.setState({apiLoading: false, dialogMailCode: true});
            console.log(e.response.data);
        })
    }

    sendMobileVerificationCode = () => {
        this.setState({apiLoading: true});
        this.handleDialogMobileClose();
        axios({
            url: '/user/verify',
            method: 'POST',
            data: {
                type: 'send_mobile_code'
            }
        }).then(r => {
            this.setState({apiLoading: false, dialogMobileCode: true});
            console.log(r.data);
        }).catch(e => {
            console.log(e.response.data);
        })
    }

    verifyMobile = () => {
        this.setState({apiLoading: true});
        this.handleDialogMobileCodeClose();
        axios({
            url: '/user/checkCode',
            method: 'POST',
            data: {
                type: "check_mob_code",
                code: this.txtMobileCode.current.value,
            }
        }).then(r => {
            this.setState({
                apiLoading: false,
                user: {
                    mob_verify: true,
                    mail_verify: this.state.user.mail_verify,
                }
            });
            console.log(r.data);
        }).catch(e => {
            console.log(e.response.data);
        })
    }

    verifyMail = () => {
        this.setState({apiLoading: true});
        this.handleDialogMailCodeClose();
        axios({
            url: '/user/checkCode',
            method: 'POST',
            data: {
                type: "check_mail_code",
                code: this.txtMailCode.current.value,
            }
        }).then(r => {
            this.setState({
                apiLoading: false,
                user: {
                    mail_verify: true,
                    mob_verify: this.state.user.mob_verify,
                }
            });
            console.log(r.data);
        }).catch(e => {
            console.log(e.response.data);
        })
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
                                                            <IconButton
                                                                onClick={this.state.user.mail_verify ? null : this.handleMailVerificationClick}>
                                                                {this.state.user.mail_verify ?
                                                                    <CheckCircleIcon color='secondary'/> :
                                                                    <ErrorIcon color='error'/>}
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
                                                            <IconButton
                                                                onClick={this.state.user.mob_verify ? null : this.handleMobileVerificationClick}>
                                                                {this.state.user.mob_verify ?
                                                                    <CheckCircleIcon color='secondary'/> :
                                                                    <ErrorIcon color='error'/>}
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
                    onClose={this.handleDialogMailClose}>
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
                        <Button onClick={this.sendMailVerificationCode} color="primary">
                            {t('sendCode')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.dialogMailCode}
                    onClose={this.handleDialogMailCodeClose}>
                    <DialogTitle>{t('mailCodeDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('mailCodeDialogContent')}
                        </DialogContentText>
                        <TextField label={t('code')} inputRef={this.txtMailCode}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogMailCodeClose}>
                            {t('later')}
                        </Button>
                        <Button onClick={this.verifyMail} color="primary">
                            {t('verify')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.dialogMobileVerificationError}
                    onClose={this.handleDialogMobileClose}>
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
                        <Button onClick={this.sendMobileVerificationCode} color="primary">
                            {t('sendCode')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.dialogMobileCode}
                    onClose={this.handleDialogMobileCodeClose}>
                    <DialogTitle>{t('mobileCodeDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('mobileCodeDialogContent')}
                        </DialogContentText>
                        <TextField label={t('code')} inputRef={this.txtMobileCode}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogMobileCodeClose}>
                            {t('later')}
                        </Button>
                        <Button onClick={this.verifyMobile} color="primary">
                            {t('verify')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Backdrop style={{zIndex: 1201}} open={this.state.apiLoading}>
                    <CircularProgress color='primary'/>
                </Backdrop>
            </Grid>
        );
    }
}

export default withRouter(Profile);
