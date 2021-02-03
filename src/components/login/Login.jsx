import React from "react";
import {
    Button,
    Checkbox, FormControl,
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

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        }
        this.inputUser = React.createRef();
        this.inputPass = React.createRef();
    }


    handleShowPasswordClick = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleLoginBtnClick = () => {
        console.log('click')
    }

    render() {
        const Signup = withRouter(({history}) => (
                <Button style={{float: 'left'}}
                        onClick={() => {
                            history.push('/signup')
                        }}
                        variant='outlined' color='primary'>
                    {t('signup')}
                </Button>
            )
        )


        return (
            <div className='login'>
                <Pattern/>
                <div className='form'>
                    <LanguageSelector />
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h3'>{t('appName')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{t('loginWelcome')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={t('username')} ref={this.inputUser}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">{t('password')}</InputLabel>
                                <Input
                                    ref={this.inputPass}
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
                            <Button style={{float: 'right'}} onClick={this.handleLoginBtnClick} variant='contained' color='primary'>{t('login')}</Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Signup/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
