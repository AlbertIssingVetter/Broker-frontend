import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
    Grid, IconButton, Input, InputAdornment, Snackbar,
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
import {Alert, Skeleton} from "@material-ui/lab";
import axios from "axios";
import Upload from "../upload/Upload";
import ErrorDialog from "../error-dialog/ErrorDialog";
import {withTheme} from '@material-ui/core/styles';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            dialogMailVerificationError: false,
            dialogMobileVerificationError: false,
            dialogNationalCardVerificationError: false,
            apiLoading: false,
            dialogMobileCode: false,
            dialogMailCode: false,
            snackbarOpen: false,
            errorDialog: false,
        }
        this.txtMobileCode = React.createRef();
        this.txtMailCode = React.createRef();
        this.txtMail = React.createRef();
        this.txtFirstName = React.createRef();
        this.txtLastName = React.createRef();
        this.txtNationalCode = React.createRef();
        this.txtMobile = React.createRef();
        this.txtAddress = React.createRef();
        this.txtTelephone = React.createRef();
        this.errorDialog = {}
    }

    componentDidMount() {
        axios({
            url: '/user/profile',
            method: 'POST',
        }).then(res => {
            console.log(res.data)
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

    handleNationalCardVerificationClick = () => {
        this.setState({dialogNationalCardVerificationError: true})
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

    handleDialogNationalCardClose = () => {
        this.setState({dialogNationalCardVerificationError: false})
    }

    handleSnackbarClose = () => {
        this.setState({snackbarOpen: false})
    }

    handleSaveProfileClick = () => {
        this.setState({apiLoading: true});
        axios({
            url: '/user/profile/edit',
            method: 'POST',
            data: {
                nationalCode: this.txtNationalCode.current.value,
                name: this.txtFirstName.current.value,
                family: this.txtLastName.current.value,
                mail: this.txtMail.current.value,
                mob: this.txtMobile.current.value,
            }
        }).then(r => {
            this.snackbarMessage = t('profileEditedSuccessfully')
            this.setState({apiLoading: false, snackbarOpen: true});
            console.log(r.data);
        }).catch(e => {
            console.log(e);
        })
    }

    handleSaveFurtherInformationClick = () => {
        this.setState({apiLoading: true});
        axios({
            url: '/user/profile/edit',
            method: 'POST',
            data: {
                tel: this.txtTelephone.current.value,
                address: this.txtAddress.current.value,
            }
        }).then(r => {
            this.snackbarMessage = t('furtherInformationEditedSuccessfully')
            this.setState({apiLoading: false, snackbarOpen: true});
            console.log(r.data);
        }).catch(e => {
            console.log(e);
        })
    }

    handleNationalCardFileChange = (files) => {
        this.nationalCardImage = files[0]
    }

    handleBtnErrorDialogClose = () => {
        this.setState({errorDialog: false})
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
                type: 'send_mob_code'
            }
        }).then(r => {
            if (r.data.status) {
                this.setState({apiLoading: false, dialogMobileCode: true});
            } else {
                this.errorDialog = {
                    title: t('error', r.data.error.code),
                    content: r.data.error.message,
                    btn: t('ok'),
                }
                this.setState({apiLoading: false, errorDialog: true});
            }
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
                type: "check_mobile_code",
                code: this.txtMobileCode.current.value,
            }
        }).then(r => {
            this.setState({
                apiLoading: false,
                user: {
                    ...this.state.user,
                    mobVerify: true,
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
                    ...this.state.user,
                    mailVerify: true,
                }
            });
            console.log(r.data);
        }).catch(e => {
            console.log(e.response.data);
        })
    }

    verifyNationalCard = () => {
        this.setState({apiLoading: true})
        this.handleDialogNationalCardClose()
        const formData = new FormData();
        formData.append("nationalCodePic", this.nationalCardImage)
        axios.post('/user/profile/edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            this.setState({
                apiLoading: false,
                user: {
                    ...this.state.user,
                    nationalCodePic: true,
                }
            })
            console.log(r.data);
        }).catch(e => {
            this.setState({apiLoading: false})
            console.log(e.response.data)
        })
    }

    render() {
        return (
            <Grid container spacing={3} className='profile'>
                <Grid style={{width: '100%'}} item sm={12} md={6}>
                    <Card>
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
                                                    inputRef={this.txtMail}
                                                    defaultValue={this.state.user.mail}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.state.user.mailVerify ? null : this.handleMailVerificationClick}>
                                                                {this.state.user.mailVerify ?
                                                                    <CheckCircleIcon style={{color: this.props.theme.palette.success.main}}/> :
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
                                            <FormControl>
                                                <Input
                                                    inputRef={this.txtFirstName}
                                                    defaultValue={this.state.user.name}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.state.user.nationalCodePic ? null : this.handleNationalCardVerificationClick}>
                                                                {this.state.user.nationalCodePic ?
                                                                    (this.state.user.status === 1 ? <CheckCircleIcon
                                                                            style={{color: this.props.theme.palette.success.main}}/> :
                                                                        <CheckCircleIcon style={{color: this.props.theme.palette.warning.main}}/>) :
                                                                    <ErrorIcon color='error'/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }/>
                                            </FormControl>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('lastName')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <FormControl>
                                                <Input
                                                    inputRef={this.txtLastName}
                                                    defaultValue={this.state.user.family}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.state.user.nationalCodePic ? null : this.handleNationalCardVerificationClick}>
                                                                {this.state.user.nationalCodePic ?
                                                                    (this.state.user.status === 1 ? <CheckCircleIcon
                                                                            style={{color: this.props.theme.palette.success.main}}/> :
                                                                        <CheckCircleIcon style={{color: this.props.theme.palette.warning.main}}/>) :
                                                                    <ErrorIcon color='error'/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }/>
                                            </FormControl>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('nationalCode')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <FormControl>
                                                <Input
                                                    inputRef={this.txtNationalCode}
                                                    defaultValue={this.state.user.nationalCode}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.state.user.nationalCodePic ? null : this.handleNationalCardVerificationClick}>
                                                                {this.state.user.nationalCodePic ?
                                                                    (this.state.user.status === 1 ? <CheckCircleIcon
                                                                            style={{color: this.props.theme.palette.success.main}}/> :
                                                                        <CheckCircleIcon style={{color: this.props.theme.palette.warning.main}}/>) :
                                                                    <ErrorIcon color='error'/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }/>
                                            </FormControl>
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
                                                    inputRef={this.txtMobile}
                                                    defaultValue={this.state.user.mob}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.state.user.mobVerify ? null : this.handleMobileVerificationClick}>
                                                                {this.state.user.mobVerify ?
                                                                    <CheckCircleIcon style={{color: this.props.theme.palette.success.main}}/> :
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
                            <Button onClick={this.handleSaveProfileClick} variant='contained'
                                    color="primary">{t('save')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid style={{width: '100%'}} item sm={12} md={6}>
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
                                            <TextField inputRef={this.txtAddress}
                                                       defaultValue={this.state.user.address}/>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('tel')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <TextField inputRef={this.txtTelephone} defaultValue={this.state.user.tel}/>
                                    }
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' onClick={this.handleSaveFurtherInformationClick} color='primary'>{t('save')}</Button>
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

                <Dialog
                    open={this.state.dialogNationalCardVerificationError}
                    onClose={this.handleDialogNationalCardClose}>
                    <DialogTitle>{t('nationalCardVerificationDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('nationalCardVerificationDialogContent')}
                        </DialogContentText>
                        <Upload onChange={this.handleNationalCardFileChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogNationalCardClose}>
                            {t('later')}
                        </Button>
                        <Button onClick={this.verifyNationalCard} color="primary">
                            {t('sendImage')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Backdrop style={{zIndex: 1201}} open={this.state.apiLoading}>
                    <CircularProgress color='primary'/>
                </Backdrop>
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={5000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="success">
                        {this.snackbarMessage}
                    </Alert>
                </Snackbar>
                <ErrorDialog title={this.errorDialog.title} open={this.state.errorDialog}
                             btns={<Button onClick={this.handleBtnErrorDialogClose}>{this.errorDialog.btn}</Button>}>
                    {this.errorDialog.content}
                </ErrorDialog>
            </Grid>
        );
    }
}

export default withRouter(withTheme(Profile));
