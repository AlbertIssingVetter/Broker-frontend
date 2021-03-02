import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    Hidden,
    IconButton,
    Input,
    InputAdornment,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import t, {getLang} from "../../lang/t";
import {Alert, Skeleton} from "@material-ui/lab";
import axios from "axios";
import Upload from "../upload/Upload";
import ErrorDialog from "../error-dialog/ErrorDialog";
import {withTheme} from '@material-ui/core/styles';
import identityConfirmationPicExample from './identity-confirmation-pic-example.jpg'
import {Visibility, VisibilityOff} from "@material-ui/icons";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            dialogMailVerificationError: false,
            dialogMobileVerificationError: false,
            dialogNationalCardVerificationError: false,
            dialogTelephoneVerificationError: false,
            apiLoading: false,
            dialogMobileCode: false,
            dialogMailCode: false,
            snackbarOpen: false,
            errorDialog: false,
            dialogAddCard: false,
            dialogTelephoneCode: false,
            dialogIdentityConfirmation: false,
        }
        this.txtMobileCode = React.createRef();
        this.txtMailCode = React.createRef();
        this.txtMail = React.createRef();
        this.txtFirstName = React.createRef();
        this.txtLastName = React.createRef();
        this.txtNationalCode = React.createRef();
        this.txtMobile = React.createRef();
        this.txtNewPassword = React.createRef();
        this.txtCurrentPassword = React.createRef();
        this.txtAddress = React.createRef();
        this.txtZipCode = React.createRef();
        this.txtTelephone = React.createRef();
        this.txtAccountNumber = React.createRef();
        this.txtCardNumber = React.createRef();
        this.txtTelephoneCode = React.createRef();
        this.errorDialog = {}
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

    handleShowPasswordClick = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }

    handleResponseError = (r) => {
        this.errorDialog = {
            title: t('error', r.data.error.code),
            content: r.data.error.message,
            btn: t('ok'),
        }
        this.setState({apiLoading: false, errorDialog: true});
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

    handleTelephoneVerificationClick = () => {
        this.setState({dialogTelephoneVerificationError: true})
    }

    handleNationalCardVerificationClick = () => {
        this.setState({dialogNationalCardVerificationError: true})
    }

    handleDialogMobileClose = () => {
        this.setState({dialogMobileVerificationError: false})
    }

    handleDialogTelephoneClose = () => {
        this.setState({dialogTelephoneVerificationError: false})
    }

    handleDialogMobileCodeClose = () => {
        this.setState({dialogMobileCode: false})
    }

    handleDialogTelephoneCodeClose = () => {
        this.setState({dialogTelephoneCode: false})
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

    handleDialogAddCardClose = () => {
        this.setState({dialogAddCard: false});
    }

    handleAddCardClick = () => {
        this.setState({dialogAddCard: true})
    }

    handleAddCard = () => {
        this.setState({apiLoading: true,});
        this.handleDialogAddCardClose()
        axios({
            url: '/account/add',
            method: 'POST',
            data: {
                accountNumber: this.txtAccountNumber.current.value,
                cardNumber: this.txtCardNumber.current.value
            }
        }).then(r => {
            if (r.data.status) {
                this.snackbarMessage = t('cardAddedSuccessfully')
                this.setState({
                    apiLoading: false,
                    snackbarOpen: true,
                    user: {
                        ...this.state.user,
                        accounts: [
                            ...this.state.user.accounts,
                            r.data,
                        ]
                    }
                });
            } else {
                this.errorDialog = {
                    title: t('error', r.data.error.code),
                    content: r.data.error.message,
                    btn: t('ok'),
                }
                this.setState({apiLoading: false, errorDialog: true})
            }
            console.log(r.data);
        }).catch(e => {
            console.log(e);
        })
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
            if (r.data.status) {
                this.snackbarMessage = t('profileEditedSuccessfully')
                this.setState({apiLoading: false, snackbarOpen: true});
            } else {
                this.handleResponseError(r);
            }
            console.log(r.data);
        }).catch(e => {
            console.log(e);
        })
    }

    handleSaveFurtherInformationClick = () => {
        this.setState({apiLoading: true});
        const formData = new FormData();
        formData.append("tel", this.txtTelephone.current.value)
        formData.append("address", this.txtAddress.current.value)
        formData.append("zipCode", this.txtZipCode.current.value)
        if (this.undertakingPic) {
            formData.append("undertakingPic", this.undertakingPic)
        }
        axios.post('/user/profile/edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            if (r.data.status) {
                this.snackbarMessage = t('furtherInformationEditedSuccessfully')
                this.setState({apiLoading: false, snackbarOpen: true});
            } else {
                this.handleResponseError(r);
            }
            console.log(r.data);
        }).catch(e => {
            this.setState({apiLoading: false})
            console.log(e.response.data)
        })
    }

    handleNationalCardFileChange = (files) => {
        this.nationalCardImage = files[0]
    }

    handleUndertakingPic = (files) => {
        this.undertakingPic = files[0];
        this.handleDialogIdentityConfirmationClose();
    }

    handleDialogIdentityConfirmationClose = () => {
        this.setState({dialogIdentityConfirmation: false})
    }

    handleUploadIdentityConfirmation = () => {
        this.setState({dialogIdentityConfirmation: true})
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
                type: 'send_mobile_code'
            }
        }).then(r => {
            if (r.data.status) {
                this.setState({apiLoading: false, dialogMobileCode: true});
            } else {
                this.handleResponseError(r);
            }
        }).catch(e => {
            console.log(e.response.data);
        })
    }

    sendTelephoneVerificationCode = () => {
        this.setState({apiLoading: true});
        this.handleDialogTelephoneClose();
        axios({
            url: '/user/verify',
            method: 'POST',
            data: {
                type: 'send_tel_code'
            }
        }).then(r => {
            if (r.data.status) {
                this.setState({apiLoading: false, dialogTelephoneCode: true});
            } else {
                this.handleResponseError(r);
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

    verifyTelephone = () => {
        this.setState({apiLoading: true})
        this.handleDialogTelephoneCodeClose();
        axios({
            url: '/user/checkCode',
            method: 'POST',
            data: {
                type: "check_tel_code",
                code: this.txtTelephoneCode.current.value,
            }
        }).then(r => {
            this.setState({
                apiLoading: false,
                user: {
                    ...this.state.user,
                    telVerify: true,
                }
            });
            console.log(r.data);
        }).catch(e => {
            console.log(e.response.data);
        })
    }

    handleEditPasswordClick = () => {
        this.setState({apiLoading: true})
        axios({
            method: 'post',
            url: 'user/profile/edit/password',
            data : {
                oldPassword: this.txtCurrentPassword.current.value,
                newPassword: this.txtNewPassword.current.value,
            }
        }).then((res) => {
            const data = res.data;
            if (data.status) {
                this.snackbarMessage = t('passwordChangedSuccessfullyTitle')
                this.setState({apiLoading: false, snackbarOpen: true});
            } else {
                this.errorDialog = {
                    title: t('error', data.error.code),
                    content: data.error.message,
                    btn: t('ok'),
                }
                this.setState({errorDialog: true, apiLoading: false})
            }
        }).catch((e) => {
            this.errorDialog = {
                title: t('passwordErrorTitle'),
                content: (
                    <>
                        <Typography>{t('passwordErrorContent')}</Typography>
                        <ul>
                            <li>{t('passwordValidationErrorLength')}</li>
                            <li>{t('passwordValidationErrorLowercase')}</li>
                            <li>{t('passwordValidationErrorUppercase')}</li>
                            <li>{t('passwordValidationErrorNumber')}</li>
                        </ul>
                    </>
                ),
                btn: t('ok'),
            }
            this.setState({errorDialog: true, apiLoading: false})
        })
    }

    render() {
        return (
            <Grid container spacing={3} className='profile'>
                <Grid style={{width: '100%'}} className='rtl-input' item sm={12} md={6}>
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
                                                                    <Tooltip title={t('verified')}>
                                                                        <CheckCircleIcon
                                                                            style={{color: this.props.theme.palette.success.main}}/>
                                                                    </Tooltip> :
                                                                    <Tooltip title={t('notVerified')}>
                                                                        <ErrorIcon color='error'/>
                                                                    </Tooltip>}
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
                                                                    (this.state.user.status === 1 ?
                                                                        <Tooltip title={t('verified')}>
                                                                            <CheckCircleIcon
                                                                                style={{color: this.props.theme.palette.success.main}}/>
                                                                        </Tooltip> :
                                                                        <Tooltip title={t('waitingForVerification')}>
                                                                            <CheckCircleIcon
                                                                                style={{color: this.props.theme.palette.warning.main}}/>
                                                                        </Tooltip>) :
                                                                    <Tooltip title={t('notVerified')}>
                                                                        <ErrorIcon color='error'/>
                                                                    </Tooltip>}
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
                                                                    (this.state.user.status === 1 ?
                                                                        <Tooltip title={t('verified')}>
                                                                            <CheckCircleIcon
                                                                                style={{color: this.props.theme.palette.success.main}}/>
                                                                        </Tooltip> :
                                                                        <Tooltip title={t('waitingForVerification')}>
                                                                            <CheckCircleIcon
                                                                                style={{color: this.props.theme.palette.warning.main}}/>
                                                                        </Tooltip>) :
                                                                    <Tooltip title={t('notVerified')}>
                                                                        <ErrorIcon color='error'/>
                                                                    </Tooltip>}
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
                                                                    (this.state.user.status === 1 ?
                                                                        <Tooltip title={t('verified')}>
                                                                            <CheckCircleIcon
                                                                                style={{color: this.props.theme.palette.success.main}}/>
                                                                        </Tooltip> :
                                                                        <Tooltip title={t('waitingForVerification')}>
                                                                            <CheckCircleIcon
                                                                                style={{color: this.props.theme.palette.warning.main}}/>
                                                                        </Tooltip>) :
                                                                    <Tooltip title={t('notVerified')}>
                                                                        <ErrorIcon color='error'/>
                                                                    </Tooltip>}
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
                                                                    <Tooltip title={t('verified')}>
                                                                        <CheckCircleIcon
                                                                            style={{color: this.props.theme.palette.success.main}}/>
                                                                    </Tooltip> :
                                                                    <Tooltip title={t('notVerified')}>
                                                                        <ErrorIcon color='error'/>
                                                                    </Tooltip>}
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
                <Grid style={{width: '100%'}} className='rtl-input' item sm={12} md={6}>
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
                                <Grid item xs={3} className='center-vertically'>{t('zipCode')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <TextField inputRef={this.txtZipCode}
                                                       defaultValue={this.state.user.zipCode}/>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('tel')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            <FormControl>
                                                <Input
                                                    inputRef={this.txtTelephone}
                                                    defaultValue={this.state.user.tel}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.state.user.telVerify ? null : this.handleTelephoneVerificationClick}>
                                                                {this.state.user.telVerify ?
                                                                    <Tooltip title={t('verified')}>
                                                                        <CheckCircleIcon
                                                                            style={{color: this.props.theme.palette.success.main}}/>
                                                                    </Tooltip> :
                                                                    <Tooltip title={t('notVerified')}>
                                                                        <ErrorIcon color='error'/>
                                                                    </Tooltip>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }/>
                                            </FormControl>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container className='row'>
                                <Grid item xs={3} className='center-vertically'>{t('identityConfirmation')}</Grid>
                                <Grid item xs={9}>
                                    {
                                        this.state.loading ?
                                            <Skeleton animation='wave' height={32} width={'100%'}/> :
                                            this.state.user.undertakingPic ?
                                                (this.state.user.status ?
                                                    <Typography>{t('verified')}</Typography> :
                                                    <Typography>{t('waitingForVerification')}</Typography>) :
                                                <div>
                                                    <Button onClick={this.handleUploadIdentityConfirmation}
                                                             variant='contained'>{t('uploadIdentityPicture')}</Button>
                                                    <Typography className='identity-pic-name'>{this.undertakingPic ? this.undertakingPic.name : ''}</Typography>
                                                </div>

                                    }
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' onClick={this.handleSaveFurtherInformationClick}
                                    color='primary'>{t('save')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid style={{width: '100%'}} className='rtl-input' item sm={12}>
                    <Card>
                        <CardContent>
                            <Typography className='header' variant="h4">{t('changePassword')}</Typography>
                            <Grid container spacing={3}>
                                <Grid className='row' item sm={12} md={6}>
                                    <Grid container>
                                        <Grid item xs={3} className='center-vertically'>{t('currentPassword')}</Grid>
                                        <Grid item xs={9}>
                                            {
                                                this.state.loading ?
                                                    <Skeleton animation='wave' height={32} width={'100%'}/> :
                                                    <TextField type='password' inputRef={this.txtCurrentPassword}/>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className='row' item sm={12} md={6}>
                                    <Grid container>
                                        <Grid item xs={3} className='center-vertically'>{t('newPassword')}</Grid>
                                        <Grid item xs={9}>
                                            {
                                                this.state.loading ?
                                                    <Skeleton animation='wave' height={32} width={'100%'}/> :
                                                    <FormControl>
                                                        <Input
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                            error={this.state.passwordErr}
                                                            onChange={this.handlePasswordChange}
                                                            aria-describedby="password-error"
                                                            inputRef={this.txtNewPassword}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onMouseDown={this.handleShowPasswordClick}>
                                                                        {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }/>
                                                        {this.state.passwordErr ?
                                                            <FormHelperText error id='password-error'>
                                                                {this.passwordError}
                                                            </FormHelperText>
                                                            : ''}
                                                    </FormControl>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </CardContent>
                        <CardActions>
                            <Button variant='contained' onClick={this.handleEditPasswordClick}
                                    color='primary'>{t('change')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid style={{width: '100%'}} item sm={12}>
                    <Card>
                        <CardContent>
                            <Typography className='header' variant="h4">{t('financialInformation')}</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>{t('bank')}</TableCell>
                                        <TableCell align='center'>{t('cardNumber')}</TableCell>
                                        <TableCell align='center'>{t('accountNumber')}</TableCell>
                                        <Hidden xsDown><TableCell align='center'>{t('status')}</TableCell></Hidden>
                                        <Hidden smDown><TableCell align='center'>{t('date')}</TableCell></Hidden>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.user.accounts && this.state.user.accounts.length ? this.state.user.accounts.map(account => (
                                        <TableRow>
                                            <TableCell
                                                align='center'>{account['accountBank' + getLang().toUpperCase()]}</TableCell>
                                            <TableCell align='center'>{account.cardNumber}</TableCell>
                                            <TableCell align='center'>{account.accountNumber}</TableCell>
                                            <Hidden xsDown><TableCell
                                                align='center'>{account.status === 1 ? t('verified') : t('notVerified')}</TableCell></Hidden>
                                            <Hidden smDown>
                                                <TableCell align='center'>
                                                    {
                                                        new Date(account.created_at).toLocaleDateString(getLang() === 'fa' ? "fa-IR" : "en-US")
                                                    }
                                                </TableCell>
                                            </Hidden>
                                        </TableRow>
                                    )) : this.state.loading ?
                                        <TableRow>
                                            <TableCell align='center'><Skeleton animation='wave'/></TableCell>
                                            <TableCell align='center'><Skeleton animation='wave'/></TableCell>
                                            <TableCell align='center'><Skeleton animation='wave'/></TableCell>
                                            <Hidden xsDown><TableCell align='center'><Skeleton
                                                animation='wave'/></TableCell></Hidden>
                                            <Hidden smDown><TableCell align='center'><Skeleton
                                                animation='wave'/></TableCell></Hidden>
                                        </TableRow>
                                        :
                                        (
                                            <TableRow>
                                                <TableCell className="no-item" colSpan={5}>{t('noItem')}</TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                            <br/>
                            <Button variant='contained' onClick={this.handleAddCardClick}
                                    color='primary'>{t('add')}</Button>
                        </CardContent>
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
                    open={this.state.dialogTelephoneVerificationError}
                    onClose={this.handleDialogTelephoneClose}>
                    <DialogTitle>{t('telephoneVerificationDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('telephoneVerificationDialogContent')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogTelephoneClose}>
                            {t('later')}
                        </Button>
                        <Button onClick={this.sendTelephoneVerificationCode} color="primary">
                            {t('sendCode')}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.dialogTelephoneCode}
                    onClose={this.handleDialogTelephoneCodeClose}>
                    <DialogTitle>{t('telephoneCodeDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('telephoneCodeDialogContent')}
                        </DialogContentText>
                        <TextField label={t('code')} inputRef={this.txtTelephoneCode}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogTelephoneCodeClose}>
                            {t('later')}
                        </Button>
                        <Button onClick={this.verifyTelephone} color="primary">
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

                <Dialog
                    open={this.state.dialogIdentityConfirmation}
                    onClose={this.handleDialogIdentityConfirmationClose}>
                    <DialogTitle>{t('identityConfirmationDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('identityConfirmationDialogContent')}
                        </DialogContentText>
                        <img width={300} src={identityConfirmationPicExample} alt='example'/>
                        <Upload onChange={this.handleUndertakingPic}/>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={this.state.dialogAddCard}
                    onClose={this.handleDialogAddCardClose}>
                    <DialogTitle>{t('addCardDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('addCardDialogContent')}
                        </DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField inputRef={this.txtCardNumber} label={t('cardNumber')}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField inputRef={this.txtAccountNumber} label={t('accountNumber')}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAddCard} color="primary">
                            {t('add')}
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
                             onClose={this.handleBtnErrorDialogClose}
                             btns={<Button onClick={this.handleBtnErrorDialogClose}>{this.errorDialog.btn}</Button>}>
                    {this.errorDialog.content}
                </ErrorDialog>
            </Grid>
        );
    }
}

export default withRouter(withTheme(Profile));
