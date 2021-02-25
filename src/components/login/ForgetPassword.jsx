import React from "react";
import Pattern from "./Pattern";
import LanguageSelector from "../langauge-selector/LanguageSelector";
import {
    Backdrop,
    Button, CircularProgress,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import t from "../../lang/t";
import {withRouter} from "react-router-dom";
import ErrorDialog from "../error-dialog/ErrorDialog";
import axios from "axios";

class ForgetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.dialog = {}
        this.txtMail= React.createRef();
    }

    handleBackClick = () => {
        this.props.history.push('/login');
    }

    handleSendCodeBtnClick = () => {
        this.setState({loading: true})
        axios({
            method: 'post',
            url: '/forget',
            data : {
                type: 'send_forget_code',
                mail: this.txtMail.current.value,
            }
        }).then((res) => {
            const data = res.data;
            if (data.status) {
                localStorage.setItem('mail', this.txtMail.current.value);
                this.props.history.push('/forget-password-code');
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

    handleBtnDialogClose = () => {
        this.setState({errorDialog: false})
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
                            <Typography>{t('forgetPasswordHeader')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={t('mail')} onKeyDown={this.handleKeyDown} inputRef={this.txtMail}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className='float-end' onClick={this.handleSendCodeBtnClick} variant='contained'
                                    color='primary'>{t('sendCode')}</Button>
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
                </div>
                <Backdrop style={{zIndex: 10}} open={this.state.loading}>
                    <CircularProgress color='primary'/>
                </Backdrop>
            </div>
        )
    }
}

export default withRouter(ForgetPassword);
