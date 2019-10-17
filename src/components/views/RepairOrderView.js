import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import moment from 'moment'
import {Link} from 'react-router-dom'

class RepairOrderView extends Component {
    componentDidMount() {

    }
    render() {
        const {t} = this.props
        return (
            <ul className="list-group">
                {this.props.repairOrders ? this.props.repairOrders.map((repairOrder, i) => (
                    <li className="list-group-item" key={ i }>
                        <Link className="row" to={ '/repairOrder/' + repairOrder.qrcode }>
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
                        </Link>
                    </li>
                )) : null}
            </ul>
        )
    }
}

export default withNamespaces()(RepairOrderView)
