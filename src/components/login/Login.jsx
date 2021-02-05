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
import t from "../../lang/t"
import axios from 'axios';
import ErrorDialog from "../error-dialog/ErrorDialog";

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
            data : {
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
                            <TextField label={t('username')} inputRef={this.inputUser}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">{t('password')}</InputLabel>
                                <Input
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
                        <Grid item xs={12}>
                            <div className='forget-row'>
                                <FormControlLabel control={<Checkbox/>} label={t('rememberMe')}/>
                                <Link to='/forget-password'>{t('forgetPassword')}</Link>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className='float-end' onClick={this.handleLoginBtnClick} variant='contained'
                                    color='primary'>{t('login')}</Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button className='float-start' onClick={this.handleSignupClick} variant='outlined'
                                    color='primary'>{t('signup')}</Button>
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

export default withRouter(Login);
