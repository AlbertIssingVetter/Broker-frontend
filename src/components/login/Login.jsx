import React from "react";
import {Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@material-ui/core";
import Pattern from "./Pattern";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'

export default class Login extends React.Component {

    render() {
        const Signup = withRouter(({history}) => (
                <Button style={{float: 'left'}}
                        onClick={() => { history.push('/signup') }}
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
                            <TextField label='username'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='password'/>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='forget-row'>
                                <FormControlLabel control={<Checkbox/>} label='Remember me'/>
                                <Link to='/forget-password'>Forget Password</Link>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Button style={{float: 'right'}} variant='contained' color='primary'>login</Button>
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
