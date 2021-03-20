import React from "react";
import {withRouter} from 'react-router-dom';
import {SvgIcon} from "@material-ui/core";

class TomanIcon extends React.Component {

    render() {
        return (
            <SvgIcon className={this.props.className}  viewBox='0 0 24 24'>
                <path d="M22,8.48A.49.49,0,0,1,21.52,8V7H19V4a1,1,0,0,0-.4-.8A1,1,0,0,0,17.73,3L3.86,7H2.48V8A.49.49,0,0,1,2,8.48H1v11H2a.49.49,0,0,1,.48.48v1h19V20a.49.49,0,0,1,.48-.48h1v-11ZM17,5.33V7H11.14Zm4,12.4A2.53,2.53,0,0,0,19.73,19H4.27A2.53,2.53,0,0,0,3,17.73V10.27A2.53,2.53,0,0,0,4.27,9H19.73A2.53,2.53,0,0,0,21,10.27Z"/>
                <path d="M12,10a4,4,0,1,0,4,4A4,4,0,0,0,12,10Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,16Z"/>
            </SvgIcon>
        );
    }
}

export default withRouter(TomanIcon);
