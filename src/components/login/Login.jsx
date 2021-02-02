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
                    sign up
                </Button>
            )
        )


        return (
            <div className='login'>
                <Pattern/>
                <div className='form'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h3'>COIN</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Welcome back! Please login to your account.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='username' ref={this.inputUser}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
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
                                <FormControlLabel control={<Checkbox/>} label='Remember me'/>
                                <Link to='/forget-password'>Forget Password</Link>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Button style={{float: 'right'}} onClick={this.handleLoginBtnClick} variant='contained' color='primary'>login</Button>
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
