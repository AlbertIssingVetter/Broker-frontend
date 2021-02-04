import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export default class ErrorDialog extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.open !== this.props.open;
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="error-dialog-title"
                aria-describedby="error-dialog-description"
            >
                <DialogTitle id="error-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="error-dialog-description">
                        {this.props.children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {this.props.btns}
                </DialogActions>
            </Dialog>
        );
    }
}
