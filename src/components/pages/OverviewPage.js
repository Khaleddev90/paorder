import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import RepairOrderViewContainer from '../../containers/views/RepairOrderViewContainer'
import {Link} from 'react-router-dom'
import TopNavContainer from 'containers/elements/TopNavContainer'

class OverviewPage extends Component {
    componentDidMount() {

    }
    render() {
        const {t} = this.props
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="OverviewPage">
                    <div className="row m-t">
                        <div className="col-12">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <div className="ibox-tools">
                                        <Link to="/scan" className="m-r-sm">
                                            <i className="fas fa-qrcode"/>
                                        </Link>
                                        <a onClick={ this.props.loadRepairPartner } className="m-r-sm">
                                            <i className="fas fa-sync"/>
                                        </a>
                                    </div>
                                    <h4>
                                        {t('overview.repairOrders')}
                                    </h4>
                                </div>
                                <div className="ibox-content">
                                    <RepairOrderViewContainer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(OverviewPage)
