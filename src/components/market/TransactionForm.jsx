import React from "react";
import {withRouter} from 'react-router-dom';
import {Grid, TextField} from "@material-ui/core";

class TransactionForm extends React.Component {

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField label='مقدار'/>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(TransactionForm);
