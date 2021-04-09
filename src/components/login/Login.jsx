import React from "react";
import {
    Backdrop,
    Button,
    Checkbox, CircularProgress, FormControl,
    FormControlLabel,
    Grid,
    IconButton, Input,
    InputAdornment, InputLabel,
    TextField,
    Typography
} from "@material-ui/core";
import Pattern from "./Pattern";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'
import {Visibility, VisibilityOff} from "@material-ui/icons";
import LanguageSelector from "../langauge-selector/LanguageSelector";
import t, {getLang} from "../../lang/t"
import axios from 'axios';
import ErrorDialog from "../error-dialog/ErrorDialog";
import cafebazaarBadge from "../install/cafebazaar-badge.png";
import cafebazaarENBadge from "../install/cafebazaar-en-badge.png";
import googlePlayBadge from "../install/google-play-badge.png";
import appStoreBadge from "../install/app-store-badge.png";
import {isInStandaloneMode, isIos} from "../../utils/tools";
import DirectDownload from "../install/DirectDownload";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            loading: false,
            errorDialog: false,
        }
        this.inputUser = React.createRef();
        this.inputPass = React.createRef();
        this.dialog = {}
    }


    handleShowPasswordClick = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleBtnDialogClose = () => {
        this.setState({errorDialog: false})
    }

    handleLoginBtnClick = () => {
        this.setState({loading: true})
        axios({
            method: 'post',
            url: '/login',
            data: {
                username: this.inputUser.current.value,
                password: this.inputPass.current.value,
            }
        }).then((res) => {
            const data = res.data;
            if (data.status) {
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
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
            console.log(e.response.data)
        })
    }

    handleSignupClick = () => {
        this.props.history.push('/signup')
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.handleLoginBtnClick();
        }
    }

    handleIOSGideClick = () => {
        if (isIos()) {
            this.props.history.push('/ios-installation-guide');
        } else {
            this.dialog = {
                title: t('error', 1),
                content: t('notIOSDevice'),
                btn: t('ok'),
            }
            this.setState({errorDialog: true, loading: false})
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
                            <Typography>{t('loginWelcome')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={t('username')} onKeyDown={this.handleKeyDown} inputRef={this.inputUser}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">{t('password')}</InputLabel>
                                <Input
                                    onKeyDown={this.handleKeyDown}
                                    inputRef={this.inputPass}
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onMouseDown={this.handleShowPasswordClick}
                                            >
                                                {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }/>
                            </FormControl>

                        </Grid>
                        <Grid className='forget-row' item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControlLabel control={<Checkbox/>} label={t('rememberMe')}/>
                                </Grid>
                                <Grid className='center-vertically' item xs={6}>
                                    <Link to='/forget-password'><Typography>{t('forgetPassword')}</Typography></Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className='float-end' onClick={this.handleLoginBtnClick} variant='contained'
                                    color='primary'>{t('login')}</Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button className='float-start' onClick={this.handleSignupClick} variant='outlined'
                                    color='primary'>{t('signup')}</Button>
                        </Grid>

                        {
                            isInStandaloneMode() ? "" : (
                                <>
                                    <Grid className='installation-badge' item xs={6}>
                                        <img className='float-end'
                                             src={getLang() === 'fa' ? cafebazaarBadge : cafebazaarENBadge} alt=""/>
                                    </Grid>

                                    <Grid className='installation-badge' item xs={6}>
                                        <img className='float-start' src={googlePlayBadge} alt=""/>
                                    </Grid>

                                    <Grid className='installation-badge' item xs={6}>
                                        <Link onClick={this.handleIOSGideClick}>
                                            <img className='float-end' src={appStoreBadge} alt=""/>
                                        </Link>
                                    </Grid>

                                    <Grid className='installation-badge' item xs={6}>
                                        <DirectDownload className='float-start'/>
                                    </Grid>
                                </>
                            )
                        }
                    </Grid>
                    <ErrorDialog title={this.dialog.title} open={this.state.errorDialog}
                                 onClose={this.handleBtnDialogClose}
                                 btns={<Button onClick={this.handleBtnDialogClose}>{this.dialog.btn}</Button>}>
                        {this.dialog.content}
                    </ErrorDialog>
                </div>
                <Backdrop style={{zIndex: 10}} open={this.state.loading}>
                    <CircularProgress color='primary'/>
                </Backdrop>
            </div>
        )
    }
}

export default withRouter(Login);
