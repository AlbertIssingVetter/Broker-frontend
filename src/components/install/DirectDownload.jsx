import React from "react";
import {withRouter} from 'react-router-dom';
import {Button} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import t from "../../lang/t";

class DirectDownload extends React.Component {

    handleClick = () => {

    }

    render() {
        return (
            <Button className={'direct-download ' + (this.props.className ? this.props.className : '')}
                    variant='contained' endIcon={<CloudDownloadIcon/>} onClick={this.handleClick}>
                {t('directDownload')}
            </Button>
        );
    }
}

export default withRouter(DirectDownload);
