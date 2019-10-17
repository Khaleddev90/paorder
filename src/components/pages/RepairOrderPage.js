import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import moment from 'moment'
import TopNavContainer from 'containers/elements/TopNavContainer'

class RepairOrderPage extends Component {
    componentDidMount() {
        this.props.getRepairPartner()
    }
    
    render() {
        const {t, repairOrder} = this.props

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="RepairOrderPage row">
                    {repairOrder ? (
                        <div className="col-12">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <h4>
                                        {t('repairOrder.title')} {repairOrder.qrcode}
                                    </h4>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-2 col-md-4 col-sm-6">
                                            <p className="m-b-xs">
                                                <small>
                                                    {t('repairOrder.updatedAt')}
                                                </small>
                                                <br/>
                                                {moment(repairOrder.updated).format('DD.MM.YYYY, HH:mm')}
                                            </p>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-6">
                                            <p className="m-b-xs">
                                                <small>
                                                    {t('repairOrder.createdAt')}
                                                </small>
                                                <br/>
                                                {moment(repairOrder.created).format('DD.MM.YYYY, HH:mm')}
                                            </p>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-6">
                                            <p className="m-b-xs">
                                                <small>
                                                    {t('repairOrder.supplier')}
                                                </small>
                                                <br/>
                                                {repairOrder.supplier}
                                            </p>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-6">
                                            <p className="m-b-xs">
                                                <small>
                                                    {t('repairOrder.deviceLabel')}
                                                </small>
                                                <br/>
                                                {repairOrder.deviceLabel}
                                            </p>
                                        </div>
                                        <div className="col-lg-2 col-md-4 col-sm-6">
                                            <p className="m-b-xs">
                                                <small>
                                                    {t('repairOrder.state')}
                                                </small>
                                                <br/>
                                                {repairOrder.state}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ibox-content">
                                    {repairOrder.events.map((event, i) => (
                                        <div className="btn btn-default" key={ i }
                                            onClick={ () => this.props.triggerRepairOrderEvent(repairOrder.id, event) }>
                                            {t('default.event.' + event)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : t('order.not_found')}
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(RepairOrderPage)
