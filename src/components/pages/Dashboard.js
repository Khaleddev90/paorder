import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'
import Footer from 'components/elements/Footer'

class Dashboard extends Component {
    componentDidMount() {
        this.props.getRepairPartner()
        
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userRole === 'supplier') {
            history.push('/')
        }
    }
    
    handleOrderlist = (state) => {
        this.props.setSearchType(state)
        this.props.setSortType('nof')
        history.push('/order-dashboard')
    }
    
    handleScan = (e) => {
        history.push('/scan')
    }

    handleQuery = (e) => {
        this.props.setSearchType('ALL')
        this.props.setSortType('nqf')
        history.push('/query')
    }
    render() {
        const { t, fulfilmentOrders } = this.props
        
        let countOfQuestion = 0
        let countOfWorkingOn = 0
        let countOfCheckIn = 0
        let countOfAssessment = 0
        let countOfProcessing = 0
        let countOfShipment = 0
        let countOfApproval = 0

        if (fulfilmentOrders) {
            for (let i=0; i < fulfilmentOrders.length; i++) {
                const orderItem = fulfilmentOrders[i]

                if (orderItem.fulfilmentOrderState === null) {
                    localStorage.removeItem('redux')
                    history.push('/')
                    return
                }
                const orderState = orderItem.fulfilmentOrderState.key

                if (orderState === 'ASSESSMENT' || orderState === 'FULFILLMENT') {
                    countOfWorkingOn ++
                }

                if (orderState === 'CONFIRMED') {
                    countOfCheckIn ++
                }

                if (orderState === 'RECEIVED' || orderState === 'ASSESSMENT') {
                    countOfAssessment ++
                }

                if (orderState === 'APPROVED') {
                    countOfProcessing ++
                }

                if (orderState === 'READY_FOR_SHIPMENT') {
                    countOfShipment ++
                }

                if (orderState === 'APPROVAL_COST_ESTIMATE') {
                    countOfApproval ++
                }

                if (orderItem.fulfilmentOrderDialogQuestions) {
                    for (let j=0; j < orderItem.fulfilmentOrderDialogQuestions.length; j++) {
                        const questionItem = orderItem.fulfilmentOrderDialogQuestions[j]

                        if (questionItem.createdById !== this.props.user.userId && questionItem.fulfilmentOrderDialogAnswer === null ) {
                            countOfQuestion++
                        }
                        
                    }
                }
            }
        }

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
            
                <div className="row same-row">
                    <Loader loading={ this.props.loading } />
                    <div className="col-lg-12 same-col">
                        {fulfilmentOrders ? (
                            <div className="widget style1 dash-item-bg h-75" onClick={ (e) => this.handleQuery(e) }>
                                <div className="row vertical-align h-100">
                                    <div className="col-3 m-auto">
                                        <div className="text-center">
                                            <div>
                                                <i className="fa fa-comments fa-4x"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-9 text-right m-auto h-auto">
                                        <h2 className="font-bold">{t('order.queries')}</h2>
                                    </div>
                                </div>
                                {countOfQuestion === 0 ? '' : <span className="label circle-badge-2 bg-danger">{countOfQuestion}</span>}
                            </div>
                        ) : ''}

                        <div className="row">
                            <div className="col-12">
                                <span> </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 same-col">
                        <div className="widget style1 dash-item-bg h-75" onClick={ (e) => this.handleScan(e) }>
                            <div className="row vertical-align h-100">
                                <div className="col-3">
                                    <i className="fa fa-qrcode fa-4x"></i>
                                </div>
                                <div className="col-9 text-right m-auto h-auto">
                                    <h2 className="font-bold">{t('order.scan_order')}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <span> {t('order.scan_desc')} </span>
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-lg-12 same-col">
                        {fulfilmentOrders ? (
                            <div className="widget style1 dash-item-bg h-75" onClick={ (e) => this.handleOrderlist('FULFILLMENT') }>
                                <div className="row vertical-align h-100">
                                    <div className="col-3 m-auto">
                                        <div>
                                            <i className="fa fa-wrench fa-4x"></i>
                                        </div>
                                    </div>
                                    <div className="col-9 text-right m-auto h-auto">
                                        <h2 className="font-bold">{t('order.currently_workingon')}</h2>
                                    </div>
                                </div>
                                {countOfWorkingOn === 0 ? '' : <span className="label circle-badge-2 bg-danger">{countOfWorkingOn}</span>}
                            </div>
                                
                        ) : ''}
                        <div className="row">
                            <div className="col-12">
                                <span> {t('order.workingon_desc')} </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={ { margin: '0 auto' } }>

                    <div className="col-lg-12 m-dash-item">
                        <div className="row">
                            <div className="col-6 m-t">
                                {fulfilmentOrders ? (
                                    <div className="widget dash-item-bg text-center" onClick={ (e) => this.handleOrderlist('CONFIRMED') }>
                                        
                                        <div className="row vertical-align h-100">
                                            <div className="col-3 m-auto">
                                                <div>
                                                    <i className="fa fa-inbox fa-3x"></i>
                                                </div>
                                            </div>
                                            <div className="col-9 text-right m-auto h-auto">
                                                <h3 className="font-bold">{t('order.expected_checkin')}</h3>
                                            </div>
                                        </div>
                                        {countOfCheckIn === 0 ? '' : <span className="label circle-badge-1 bg-darkgray">{countOfCheckIn}</span>}
                                    </div>
                                ) : ''}
                            </div>
                            <div className="col-6 m-t">
                                {fulfilmentOrders ? (
                                    <div className="widget dash-item-bg text-center" onClick={ (e) => this.handleOrderlist('RECEIVED') }>
                                        <div className="row vertical-align h-100">
                                            <div className="col-3 m-auto">
                                                <div>
                                                    <i className="fa fa-list-alt fa-3x"></i>
                                                </div>
                                            </div>
                                            <div className="col-9 text-right m-auto h-auto">
                                                <h3 className="font-bold">{t('order.due_assessment')}</h3>
                                            </div>
                                        </div>
                                        {countOfAssessment === 0 ? '' : <span className="label circle-badge-1 bg-danger">{countOfAssessment}</span>}

                                    </div>
                                ) : ''}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6 m-t">
                                {fulfilmentOrders ? (
                                    <div className="widget dash-item-bg text-center" onClick={ (e) => this.handleOrderlist('APPROVED') }>

                                        <div className="row vertical-align h-100">
                                            <div className="col-3 m-auto">
                                                <div>
                                                    <i className="fa fa-play-circle fa-3x"></i>
                                                </div>
                                            </div>
                                            <div className="col-9 text-right m-auto h-auto">
                                                <h3 className="font-bold">{t('order.waiting_processing')}</h3>
                                            </div>
                                        </div>
                                        {countOfProcessing === 0 ? '' : <span className="label circle-badge-1 bg-danger">{countOfProcessing}</span>}
                                    </div>
                                ) : ''}
                            </div>  
                            <div className="col-6 m-t">
                                {fulfilmentOrders ? (
                                    <div className="widget dash-item-bg text-center" onClick={ (e) => this.handleOrderlist('READY_FOR_SHIPMENT') }>
                                        <div className="row vertical-align h-100">
                                            <div className="col-3 m-auto">
                                                <div>
                                                    <i className="fa fa-truck fa-flip-horizontal fa-3x"></i>
                                                </div>
                                            </div>
                                            <div className="col-9 text-right m-auto h-auto">
                                                <h3 className="font-bold">{t('order.ready_shipment')}</h3>
                                            </div>
                                        </div>
                                        {countOfShipment === 0 ? '' : <span className="label circle-badge-1 bg-darkgray">{countOfShipment}</span>}
                                    </div>
                                ) : ''}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6 m-t">
                                {fulfilmentOrders ? (
                                    <div className="widget dash-item-bg text-center" onClick={ (e) => this.handleOrderlist('APPROVAL_COST_ESTIMATE') }>

                                        <div className="row vertical-align h-100">
                                            <div className="col-3 m-auto">
                                                <div>
                                                    <i className="fa fa-spinner fa-3x"></i>
                                                </div>
                                            </div>
                                            <div className="col-9 text-right m-auto h-auto">
                                                <h3 className="font-bold">{t('order.pending_Approval')}</h3>
                                            </div>
                                        </div>
                                        {countOfApproval === 0 ? '' : <span className="label circle-badge-1 bg-darkgray">{countOfApproval}</span>}

                                    </div>
                                ) : ''}
                            </div>
                        </div>

                    </div>

                </div>
            
            </div></div><Footer/></div></div>
        )
    }
}

export default withNamespaces()(Dashboard)
