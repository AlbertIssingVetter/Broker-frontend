import React from "react";
import {withRouter} from 'react-router-dom';
import {Box, Typography} from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import t from "../../lang/t";

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            border: 1,
            borderColor: 'text.primary',
            files: []
        }
        this.input = React.createRef();
    }

    handleDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.setState({border: 2, borderColor: 'primary.main'})
    }

    handleDrag = (event) => {
        event.preventDefault();
        this.setState({border: 1, borderColor: 'text.primary', files: event.nativeEvent.dataTransfer.files})
        this.props.onChange(event.nativeEvent.dataTransfer.files);
    }

    handleDragLeave = () => {
        this.setState({border: 1, borderColor: 'text.primary'})
    }

    handleClick = () => {
        this.input.current.click();
    }

    handleInputChange = (event) => {
        this.setState({files: event.target.files})
        this.props.onChange(event.target.files);
    }

    render() {
        return (
            <Box className='upload' onDragOver={this.handleDragOver} onDrop={this.handleDrag}
                 onClick={this.handleClick}
                 border={this.state.border} borderColor={this.state.borderColor}
                 borderRadius='borderRadius' onDragLeave={this.handleDragLeave}>
                <input type='file' onChange={this.handleInputChange} ref={this.input}/>
                <div className='center'>
                    <BackupIcon fontSize='large'/>
                    <Typography>{this.state.files.length ? t('selectedFiles', this.state.files.length) : t('selectFile')}</Typography>
                </div>
            </Box>
        );
    }

}

export default withRouter(Upload);
