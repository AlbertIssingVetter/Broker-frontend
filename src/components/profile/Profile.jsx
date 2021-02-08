import React from "react";
import {withRouter} from 'react-router-dom';
import {Button, Card, CardActions, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import t from "../../lang/t";
import {Skeleton} from "@material-ui/lab";
import axios from "axios";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {}
        }
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


    render() {
        return (
            <Grid container spacing={3}>
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
                                            <TextField defaultValue={this.state.user.mail}/>
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
                                            <TextField defaultValue={this.state.user.mob}/>
                                    }
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions className='actions'>
                            <Button variant='contained' color="primary">{t('save')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Profile);
