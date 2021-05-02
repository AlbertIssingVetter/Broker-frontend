import React from "react";
import {Button, withStyles} from "@material-ui/core";

const styles = theme => ({
    primary: {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
            boxShadow: 'none',
        }
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.dark,
            boxShadow: 'none',
        }
    },
    success: {
        backgroundColor: theme.palette.success.main,
        borderColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
            borderColor: theme.palette.success.dark,
            boxShadow: 'none',
        },
    },
    error: {
        backgroundColor: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
            borderColor: theme.palette.error.dark,
            boxShadow: 'none',
        },
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
            borderColor: theme.palette.warning.dark,
            boxShadow: 'none',
        },
    }
})

class ColorButton extends React.Component {

    render() {
        return (
            <Button disabled={this.props.disabled} variant={this.props.variant} onClick={this.props.onClick}
                    className={`${this.props.classes[this.props.color]} ${this.props.className}`}>
                {this.props.children}
            </Button>
        );
    }
}

export default withStyles(styles)(ColorButton);
