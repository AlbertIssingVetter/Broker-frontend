import React from "react";
import Pattern from "./Pattern";
import LanguageSelector from "../langauge-selector/LanguageSelector";
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
    Typography
} from "@material-ui/core";
import t from "../../lang/t";
import {withRouter} from "react-router-dom";
import ErrorDialog from "../error-dialog/ErrorDialog";
import axios from "axios";
import {Visibility, VisibilityOff} from "@material-ui/icons";

class ForgetPasswordCode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.dialog = {}
        this.txtCode= React.createRef();
    }

    handleBackClick = () => {
        this.props.history.push('/forget-password');
    }

    handleSendCodeBtnClick = () => {
        this.setState({loading: true})
        axios({
            method: 'post',
            url: '/forget',
            data : {
                type: 'check_forget_code',
                mail: localStorage.getItem('mail'),
                code: this.txtCode.current.value,
                password: this.password,
            }
        }).then((res) => {
            const data = res.data;
            if (data.status) {
                localStorage.removeItem('mail');
                this.setState({passwordChangedSuccessfullyDialog: true, loading: false})
            } else {
                this.dialog = {
                    title: t('error', data.error.code),
                    content: data.error.message,
                    btn: t('ok'),
                }
                this.setState({errorDialog: true, loading: false})
            }
        }).catch((e) => {
            this.dialog = {
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
            this.setState({errorDialog: true, loading: false})
        })
    }

    handleBtnDialogClose = () => {
        this.setState({errorDialog: false})
    }

    handlePasswordChange = (e) => {
        this.password = e.target.value
        this.passwordError = (
            <ul>
                {this.password.length < 8 && (<li>{t('passwordValidationErrorLength')}</li>)}
                {this.password.search(/[a-z]/) === -1 && (<li>{t('passwordValidationErrorLowercase')}</li>)}
                {this.password.search(/[A-Z]/) === -1 && (<li>{t('passwordValidationErrorUppercase')}</li>)}
                {this.password.search(/\d/) === -1 && (<li>{t('passwordValidationErrorNumber')}</li>)}
            </ul>

        );
        this.setState({passwordErr: (this.password.length < 8 || this.password.search(/[a-z]/) === -1 || this.password.search(/[A-Z]/) === -1 || this.password.search(/\d/) === -1)})
    }

    handleShowPasswordClick = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }

    handlePasswordChangedSuccessfullyClose = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className='login'>
                <Pattern/>
                <div className='form'>
                    <LanguageSelector/>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h3'>{t('appName')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{t('forgetPasswordCodeHeader')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={t('code')} onKeyDown={this.handleKeyDown} inputRef={this.txtCode}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">{t('password')}</InputLabel>
                                <Input
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    error={this.state.passwordErr}
                                    onChange={this.handlePasswordChange}
                                    aria-describedby="password-error"
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

                        </Grid>
                        <Grid item xs={6}>
                            <Button className='float-end' onClick={this.handleSendCodeBtnClick} variant='contained'
                                    color='primary'>{t('changePassword')}</Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button className='float-start' onClick={this.handleBackClick} variant='outlined'
                                    color='primary'>{t('back')}</Button>
                        </Grid>
                    </Grid>
                    <ErrorDialog title={this.dialog.title} open={this.state.errorDialog} onClose={this.handleBtnDialogClose}
                                 btns={<Button onClick={this.handleBtnDialogClose}>{this.dialog.btn}</Button>}>
                        {this.dialog.content}
                    </ErrorDialog>
                    <Dialog
                        open={this.state.passwordChangedSuccessfullyDialog}
                        onClose={this.handlePasswordChangedSuccessfullyClose}
                    >
                        <DialogTitle>{t('passwordChangedSuccessfullyTitle')}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {t('passwordChangedSuccessfullyContent')}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handlePasswordChangedSuccessfullyClose}>{t('ok')}</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Backdrop style={{zIndex: 10}} open={this.state.loading}>
                    <CircularProgress color='primary'/>
                </Backdrop>
            </div>
        )
    }
}

export default withRouter(ForgetPasswordCode);
