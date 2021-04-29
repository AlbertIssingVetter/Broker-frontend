import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {withTheme} from "@material-ui/core/styles";

class CircularProgressWithLabel extends React.Component{


    render() {
        return (
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate" value={100}
                                  style={{color: this.props.theme.palette.text.secondary,
                                      backgroundColor: '#000000aa', borderRadius: '50%'}}/>
                <CircularProgress variant="determinate" value={this.props.value}
                                  style={{color: this.props.theme.palette[this.props.color ?
                                          this.props.color : 'primary'].main, position: 'absolute', left:0}}/>
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="caption" component="div"
                                style={{color: this.props.theme.palette[this.props.color ?
                                        this.props.color : 'primary'].main}}>{`${Math.round(
                        this.props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }
}

export default withTheme(CircularProgressWithLabel);
