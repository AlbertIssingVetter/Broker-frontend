import React from "react";
import {withRouter} from 'react-router-dom';
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import t from "../../lang/t";
import iosFirst from './ios-first.png'
import iosSecond from './ios-second.png'
import iosSecondOld from './ios-second-old.png'
import iosThird from './ios-third.png'

class IosInstallationGuide extends React.Component {

    render() {
        return (
            <div className='ios-guide'>
                <Button className="back-button" variant='outlined' onClick={this.props.history.goBack}>{t('back')}</Button>
                <Typography variant="h4" className="content-header">{t('iosInstallationGuide')}</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{t('iosInstallationGuideFirst')}</Typography>
                                <div className="text-center">
                                    <img className='ios-guide-image' src={iosFirst} alt=''/>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{t('iosInstallationGuideSecond')}</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <div className='text-center'>
                                            <img className='ios-guide-image' src={iosSecond} alt=''/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div className="text-center">
                                            <img className='ios-guide-image' src={iosSecondOld} alt=''/>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{t('iosInstallationGuideThird')}</Typography>
                                <div className='text-center'>
                                    <img className='ios-guide-image' src={iosThird} alt=''/>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(IosInstallationGuide);
