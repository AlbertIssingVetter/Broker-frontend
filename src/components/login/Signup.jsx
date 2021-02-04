import React from "react";
import {
    Backdrop,
    Button,
    Checkbox, CircularProgress, FormControl,
    FormControlLabel, FormHelperText,
    Grid,
    IconButton, Input,
    InputAdornment, InputLabel,
    TextField,
    Typography
} from "@material-ui/core";
import Pattern from "./Pattern";
import {Link} from "react-router-dom";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import LanguageSelector from "../langauge-selector/LanguageSelector";
import t from "../../lang/t"
import axios from 'axios';
import ErrorDialog from "../error-dialog/ErrorDialog";
import {withRouter} from 'react-router-dom'

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            canSignUp: false,
            usernameErr: false,
            passwordErr: false,
            mailErr: false,
            mobileErr: false,
            errorDialog: false,
            loading: false,
        }
        this.dialog = {}
    }

    handleUsernameChange = (e) => {
        this.username = e.target.value
        this.setState({usernameErr: this.username.length < 3})
    }

    handleMailChange = (e) => {
        this.mail = e.target.value
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({mailErr: !re.test(this.mail)})
    }

    handleMobileChange = (e) => {
        this.mobile = e.target.value
        const re = /^09\d{9}$/g;
        this.setState({mobileErr: !re.test(this.mobile)})
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

    handleAgreeBtnChange = (e) => {
        this.setState({canSignUp: e.target.checked})
    }

    handleBtnDialogClose = () => {
        this.setState({errorDialog: false})
    }


    handleLoginBtnClick = () => {
        const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const mobileRegex = /^09\d{9}$/g;
        if (mailRegex.test(this.mail) && mobileRegex.test(this.mobile) && this.username.length > 2 &&
            this.password.length > 7 && this.password.search(/[a-z]/) > -1 && this.password.search(/[A-Z]/) > -1 && this.password.search(/\d/) > -1) {
            this.setState({loading: true})
            axios({
                method: 'post',
                url: '/signup',
                data: {
                    username: this.username,
                    password: this.password,
                    mob: this.mobile,
                    mail: this.mail,
                }
            }).then((res) => {
                const data = res.data;
                if (data.status) {
                    localStorage.setItem('token', data.token);
                    this.props.history.push('/');
                } else {
                    this.dialog = {
                        title: t('error', data.error.code),
                        content: data.error.message,
                        btn: t('ok'),
                    }
                    this.setState({errorDialog: true, loading: false})
                }
            }).catch((e) => {
                const data = e.response.data;
                this.dialog = {
                    title: t('signupError'),
                    content: (
                        <div>
                            {data.message} {t('fixSignupError')}
                            <ul>
                                {Object.keys(data.errors).map(error => <li>{error}</li>)}
                            </ul>
                        </div>
                    ),
                    btn: t('ok'),
                }
                this.setState({errorDialog: true, loading: false})
            })
        } else {
            this.dialog = {
                title: t('validationError'),
                content: t('signupError'),
                btn: t('ok'),
            }
            this.setState({errorDialog: true})
        }
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
                            <Typography>{t('signupHeader')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                helperText={this.state.usernameErr ? t('usernameValidationError') : ''}
                                error={this.state.usernameErr}
                                label={t('username')} onChange={this.handleUsernameChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField helperText={this.state.mailErr ? t('mailValidationError') : ''}
                                       error={this.state.mailErr}
                                       label={t('mail')} onChange={this.handleMailChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField helperText={this.state.mobileErr ? t('mobileValidationError') : ''}
                                       error={this.state.mobileErr}
                                       label={t('mobile')} onChange={this.handleMobileChange}/>
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
                        <Grid item xs={12}>
                            <div className='forget-row'>
                                <FormControlLabel onChange={this.handleAgreeBtnChange} control={<Checkbox/>}
                                                  label={t('agreeWithTerms')}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={this.handleLoginBtnClick} variant='contained'
                                color='primary' disabled={!this.state.canSignUp}>
                                {t('signup')}
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Link to='/login'>{t('alreadyHaveAccount')}</Link>
                        </Grid>

                    </Grid>
                    <ErrorDialog title={this.dialog.title} open={this.state.errorDialog}
                                 btns={<Button onClick={this.handleBtnDialogClose}>{this.dialog.btn}</Button>}>
                        {this.dialog.content}
                    </ErrorDialog>
                </div>
                <Backdrop open={this.state.loading}>
                    <CircularProgress color='primary' />
                </Backdrop>
            </div>
        )
    }
}

export default withRouter(Signup);
