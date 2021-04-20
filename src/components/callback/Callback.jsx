import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import t from "../../lang/t";
import {Alert} from "@material-ui/lab";
import axios from "axios";
import ErrorDialog from "../error-dialog/ErrorDialog";

class Callback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.params = new URLSearchParams(this.props.location.search)
        this.errorDialog = {}
    }

    handleClick = () => {
        this.setState({loading: true});
        axios({
            url: '/payment/verify',
            method: 'POST',
            data: {
                id: this.params.get('order_id'),
            }
        }).then(res => {
            if (this.params.get('status') < 8) {
                this.props.history.push('/wallet/irr');
            } else {
                if (res.data.status) {
                    this.props.history.push('/wallet/irr');
                } else {
                    this.errorDialog = {
                        title: t('error', res.data.error.code),
                        content: res.data.error.message,
                        btn: t('back'),
                    }
                    this.setState({errorDialog: true, loading: false})
                }
            }
        }).catch(err => {
            this.errorDialog = {
                title: t('error', 500),
                content: t('unknownError'),
                btn: t('ok'),
            }
            this.setState({errorDialog: true, loading: false})
        })
    }

    handleBtnErrorDialogClose = () => {
        this.props.history.push('/wallet/irr');
    }

    render() {
        return (
            <Container className='callback'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                    <Alert severity={this.params.get('status') < 8 ? 'error' :
                                        (this.params.get('status') < 11 ? 'info' : 'success')}>
                                        {t('irrTransactionsStatus' + this.params.get('status'))}
                                    </Alert>
                                <Typography className='track-code' gutterBottom>
                                    {t('yourTrackCode', this.params.get('track_id'))}
                                </Typography>
                                {
                                    this.params.get('status') > 7 && (
                                        <Typography>
                                            {t('irrDepositSuccessDescription')}
                                        </Typography>
                                    )
                                }
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.handleClick} variant={"contained"} color='primary'>
                                    {t(this.params.get('status') > 7 ? 'acceptAndBack' : 'back')}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <ErrorDialog title={this.errorDialog.title} open={this.state.errorDialog}
                             onClose={this.handleBtnErrorDialogClose}
                             btns={<Button onClick={this.handleBtnErrorDialogClose}>{this.errorDialog.btn}</Button>}>
                    {this.errorDialog.content}
                </ErrorDialog>
                <Backdrop style={{zIndex: 1201}} open={this.state.loading}>
                    <CircularProgress color='primary'/>
                </Backdrop>
            </Container>
        );
    }
}

export default withRouter(Callback);
