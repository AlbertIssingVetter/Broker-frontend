import React from "react";
import {withRouter} from 'react-router-dom';
import {Backdrop, Card, CardContent, CircularProgress, Grid, IconButton, Typography} from "@material-ui/core";
import t from "../../lang/t";
import LanguageSelector from "../langauge-selector/LanguageSelector";
import DarkModeSelector from "../dark-mode-selector/DarkModeSelector";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from "axios";

class Setting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    handleLogoutClick = () => {
        this.setState({loading: true});
        axios({
            url: '/user/logout',
            method: 'POST'
        }).then(res => {
            this.setState({loading: false});
            if (res.data.status) {
                localStorage.removeItem('token');
                this.props.history.push('/login')
            } else {
                console.log(res.data)
            }
        }).catch(err => {
            this.setState({loading: false});
            if (err.response.status === 401) {
                localStorage.removeItem('token');
                this.props.history.push('/login')
            } else {
                console.log(err.response.data)
            }
        })
    }

    render() {
        return (
            <>
                <Typography variant="h4" className="content-header">{t('setting')}</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent className='center-vertically setting-height'>
                                <div className='setting-label'>
                                    {t('changeLanguage')}
                                </div>
                                <div className='setting-value'>
                                    <LanguageSelector/>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent className='center-vertically setting-height'>
                                <div className='setting-label'>
                                    {t('changeTheme')}
                                </div>
                                <div className='setting-value'>
                                    <DarkModeSelector getDarkMode={this.props.getDarkMode}
                                                      toggleDarkMode={this.props.toggleDarkMode}/>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent className='center-vertically setting-height'>
                                <div className='setting-label'>
                                    {t('logout')}
                                </div>
                                <div className='setting-value'>
                                    <IconButton onClick={this.handleLogoutClick}>
                                        <ExitToAppIcon/>
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {/*TODO must show loading*/}
                <Backdrop open={false}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        );
    }
}

export default withRouter(Setting);
