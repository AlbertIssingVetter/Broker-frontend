import React from "react";
import {withRouter} from 'react-router-dom';
import {
    Backdrop,
    Button,
    Card,
    CardContent, CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import t from "../../lang/t";
import {Alert} from "@material-ui/lab";
import axios from "axios";
import ColorButton from "../color-button/ColorButton";
import ErrorDialog from "../error-dialog/ErrorDialog";

class IRRDeposit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorDialog: false,
            card: '',
            cards: [],
            setting: {
                min_irr_deposit: 1000,
                max_irr_deposit: 500_000_000,
            }
        }
        this.txtAmount = React.createRef();
        this.errorDialog = {}
    }

    componentDidMount() {
        axios({
            url: '/account',
            method: 'POST',
        }).then(res => {
            if (res.data.status) {
                this.setState({cards: res.data.data.cardNumber, setting: res.data.data.setting})
            } else {
                this.errorDialog = {
                    title: t('error', res.data.error.code),
                    content: res.data.error.message,
                    btn: t('ok'),
                }
                this.setState({errorDialog: true, loading: false})
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

    handleCardChange = (event) => {
        this.setState({card: event.target.value})
    }

    handleAddCardNumber = () => {
        this.props.history.push('/profile')
    }

    handleDepositClick = () => {
        if (!this.state.card) {
            this.errorDialog = {
                title: t('error', 1001),
                content: t('selectACardNumber'),
                btn: t('ok'),
            }
            this.setState({errorDialog: true, loading: false})
            return;
        }
        if (this.txtAmount.current.value < Number(this.state.setting.min_irr_deposit)) {
            this.errorDialog = {
                title: t('error', 1002),
                content: t('minIRRDeposit', this.state.setting.min_irr_deposit),
                btn: t('ok'),
            }
            this.setState({errorDialog: true, loading: false})
            return;
        }
        if (this.txtAmount.current.value > Number(this.state.setting.max_irr_deposit)) {
            this.errorDialog = {
                title: t('error', 1003),
                content: t('maxIRRDeposit', this.state.setting.max_irr_deposit),
                btn: t('ok'),
            }
            this.setState({errorDialog: true, loading: false})
            return;
        }
        this.setState({loading: true});
        axios({
            url: '/payment/add',
            method: 'POST',
            data: {
                amount: this.txtAmount.current.value,
                cardNumber: this.state.card
            }
        }).then(res => {
            if (res.data.status) {
                window.location.href = res.data.data.paymentURL;
            } else {
                this.errorDialog = {
                    title: t('error', res.data.error.code),
                    content: res.data.error.message,
                    btn: t('ok'),
                }
                this.setState({errorDialog: true, loading: false})
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
        this.setState({errorDialog: false})
    }

    render() {
        return (
            <Card className='irr-deposit'>
                <CardContent>
                    <Typography variant="h4" component='h2' gutterBottom>
                        {t('acceleratedDeposit')}
                    </Typography>
                    <Alert severity="error">{t('irrWarningDeposit')}</Alert>
                    <Typography gutterBottom>{t('irrDepositTitleText')}</Typography>
                    {t('irrDepositHintList')}
                    <FormControl className="bank-card-selector">
                        <InputLabel>{t('bankCard')}</InputLabel>
                        <Select
                            value={this.state.card}
                            onChange={this.handleCardChange}>
                            {
                                this.state.cards.map(card =>
                                    <MenuItem key={card.cardNumber} value={card.cardNumber}>
                                        {card.accountBank + ': ' + card.cardNumber}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <Button className="btn-add-card-number" variant='outlined' color='primary'
                            onClick={this.handleAddCardNumber}>{t('addCardNumber')}</Button>
                    <br/>
                    <TextField className='bank-card-selector' inputRef={this.txtAmount}
                               label={t('depositAmountAtToman')}/>
                    <br/>
                    <div className="actions">
                        <ColorButton variant='contained' color='success'
                                     onClick={this.handleDepositClick}>{t('transferToBank')}</ColorButton>
                        <Button variant='contained' onClick={this.props.history.goBack}>{t('back')}</Button>
                    </div>
                </CardContent>
                <ErrorDialog title={this.errorDialog.title} open={this.state.errorDialog}
                             onClose={this.handleBtnErrorDialogClose}
                             btns={<Button onClick={this.handleBtnErrorDialogClose}>{this.errorDialog.btn}</Button>}>
                    {this.errorDialog.content}
                </ErrorDialog>
                <Backdrop style={{zIndex: 1201}} open={this.state.loading}>
                    <CircularProgress color='primary'/>
                </Backdrop>
            </Card>
        );
    }
}

export default withRouter(IRRDeposit);
