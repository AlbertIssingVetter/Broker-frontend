import React from "react";
import Typography from "@material-ui/core/Typography";
import {withTheme} from "@material-ui/core/styles";
import t from "../../lang/t";

class DepthContrast extends React.Component {

    render() {
        const total = this.props.depthContrast.sell + this.props.depthContrast.buy;
        const sellWidth = total === 0 ? 0 : this.props.depthContrast.sell * 100 / total;
        const buyWidth = total === 0 ? 0 : this.props.depthContrast.buy * 100 / total;
        return (
            <div style={{margin: '10px 0'}}>
                <div >
                    <div style={{
                        height: '7px',
                        width: `${sellWidth}%`,
                        backgroundColor: this.props.theme.palette.error.main,
                        display: 'inline-block',
                        borderRadius: '0 4px 4px 0',
                        float: 'right',
                    }}/>
                    <div style={{
                        height: '7px',
                        width: `${buyWidth}%`,
                        backgroundColor: this.props.theme.palette.success.main,
                        display: 'inline-block',
                        borderRadius: '4px 0 0 4px',
                        float: 'left'
                    }}/>
                </div>
                <div>
                    <Typography style={{color: this.props.theme.palette.error.main, float: 'right', margin: '10px 0'}}>
                        {t('sell')}
                    </Typography>
                    <Typography style={{color: this.props.theme.palette.success.main, float: 'left', margin: '10px 0'}}>
                        {t('buy')}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withTheme(DepthContrast);
