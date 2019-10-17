import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import Loader from 'components/elements/Loader'
import SearchFilter from './SearchFilter'
import TopNavContainer from 'containers/elements/TopNavContainer'
import moment from 'moment'
import 'moment/locale/de' // without this line it didn't work

class OrderDashboard extends Component {
    state = {
        searchQRCode: '',
        toggleFilter: false,
        seletectType: null,
    }
    componentDidMount() {
        this.props.getRepairPartner()

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userRole === 'supplier') {
            history.push('/')
        }
        if (localStorage.getItem('currentLanguage') && localStorage.getItem('currentLanguage') === 'DE') {
            moment.locale('de')
        } else {
            moment.locale('en')
        }
    }
    
    handleOrderDetail = (e) => {
        history.push('/order-detail/' + e.qrcode + '/order')
    }
    
    handlerToggle = (type) => {
        this.setState({toggleFilter : true, seletectType: type})
        
    }

    handleClose = (e) => {
        this.setState({toggleFilter : false})
    }

    handleSelectFilter = (key) => {
        if (this.state.seletectType === 'state') {
            if (key === 0) {
                this.props.setSearchType('ALL')
            } else if (key === 1) {
                this.props.setSearchType('ASSESSMENT')
            } else if (key === 2) {
                this.props.setSearchType('RECEIVED')
            } else if (key === 3) {
                this.props.setSearchType('CONFIRMED')
            } else if (key === 4) {
                this.props.setSearchType('APPROVAL_COST_ESTIMATE')
            } else if (key === 5) {
                this.props.setSearchType('READY_FOR_SHIPMENT')
            } else if (key === 6) {
                this.props.setSearchType('APPROVED')
            } else if (key === 7) {
                this.props.setSearchType('CLOSED')
            }
        } else {
            if (key === 1) {
                this.props.setSortType('nof')
            } else if (key === 0) {
                this.props.setSortType('oof')
            } else if (key === 2) {
                this.props.setSortType('ouf')
            } else if (key === 3) {
                this.props.setSortType('nuf')
            }
        }
        this.setState({toggleFilter : false})
    }
    render() {
        const { t, fulfilmentOrders } = this.props

        let titleState = t('common.all')

        if (this.props.searchType) {
            if (this.props.searchType === 'FULFILLMENT') {
                titleState = t('order.Currently_workingon')
            } else if (this.props.searchType === 'CONFIRMED') {
                titleState = t('order.Expected_checkin')
            } else if (this.props.searchType === 'RECEIVED') {
                titleState = t('order.Due_assessment')
            } else if (this.props.searchType === 'APPROVED') {
                titleState = t('order.Waiting_processing')
            } else if (this.props.searchType === 'READY_FOR_SHIPMENT') {
                titleState = t('order.Ready_shipment')
            } else if (this.props.searchType === 'APPROVAL_COST_ESTIMATE') {
                titleState = t('order.Pending_Approval')
            } else if (this.props.searchType === 'CLOSED') {
                titleState = t('order.closed')
            } else {
                titleState = t('common.all')
            }

        }

        let titleSort = t('order.newest_order_first')
        let sortedOrders = []

        if (fulfilmentOrders) {
            if (this.props.sort === 'nof') {
                titleSort = t('order.newest_order_first')

                sortedOrders = fulfilmentOrders.sort( (a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
            } else if (this.props.sort === 'oof') {
                titleSort = t('order.oldest_order_first')
                sortedOrders = fulfilmentOrders.sort( (a, b) => {
                    return new Date(a.created_at) - new Date(b.created_at)
                })
            } else if (this.props.sort === 'ouf') {
                titleSort = t('order.oldest_update_first')
                sortedOrders = fulfilmentOrders.sort( (a, b) => {
                    return new Date(a.updated_at) - new Date(b.updated_at)
                })
            } else if (this.props.sort === 'nuf') {
                titleSort = t('order.newest_update_first')
                sortedOrders = fulfilmentOrders.sort( (a, b) => {
                    return new Date(b.updated_at) - new Date(a.updated_at)
                })
            }
        }

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />
                    <div className="col-lg-12">
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>{t('order.search_orders')}</h5>
                            </div>
                            <div className="ibox-content">
                                {fulfilmentOrders ? (
                                    <div>
                                        <div className="row mb-3">
                                            <div className="col-lg-12 mb-3">
                                                <input value={ this.state.searchQRCode } onChange={ (e) => this.setState({searchQRCode: e.target.value}) } 
                                                    type="text" placeholder={ t('common.search') } className="form-control" />
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-white btn-dropdown w-100" type="button" onClick={ (e) => this.handlerToggle('state') }>{titleState} </button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-white btn-dropdown w-100" type="button" onClick={ (e) => this.handlerToggle('sort') }>{titleSort} </button>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4">
                                                <table className="table table-hover " id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid">
                                                    <tbody>
                                                        {
                                                            sortedOrders.map((item, key) => {
                                                                const orderState = item.fulfilmentOrderState.key
                                                                if (this.props.searchType === 'ALL' || orderState === this.props.searchType ||
                                                    (this.props.searchType === 'FULFILLMENT' && orderState === 'ASSESSMENT') ||
                                                    (this.props.searchType === 'RECEIVED' && orderState === 'ASSESSMENT')
                                                                ) {
                                                        
                                                                    if (item.id.toString().includes(this.state.searchQRCode.toLowerCase()) ||
                                                        (item.externalReference &&
                                                            item.externalReference.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.deviceLabel && item.deviceLabel.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.deviceSupplier && item.deviceSupplier.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.deviceSerialnumber && item.deviceSerialnumber.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.customer && item.customer.customerFirstname.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.customer && item.customer.customerLastname.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.customer && item.customer.customerEmail.toLowerCase().includes(this.state.searchQRCode.toLowerCase()))) {

                                                                        let orderIcon = <i className="fa fa-wrench fa-3x p-inherit"></i>

                                                                        if (orderState === 'FULFILLMENT') {
                                                                            orderIcon = <i className="fa fa-wrench fa-3x p-inherit"></i>
                                                                        } else if (orderState === 'CONFIRMED') {
                                                                            orderIcon = <i className="fa fa-inbox fa-3x p-inherit"></i>
                                                                        } else if (orderState === 'RECEIVED' || orderState === 'ASSESSMENT') {
                                                                            orderIcon = <i className="fa fa-list-alt fa-3x p-inherit"></i>
                                                                        } else if (orderState === 'APPROVED') {
                                                                            orderIcon = <i className="fa fa-play-circle fa-3x p-inherit"></i>
                                                                        } else if (orderState === 'READY_FOR_SHIPMENT') {
                                                                            orderIcon = <i className="fa fa-truck fa-3x p-inherit"></i>
                                                                        } else if (orderState === 'APPROVAL_COST_ESTIMATE') {
                                                                            orderIcon = <i className="fa fa-spinner fa-3x p-inherit"></i>
                                                                        } else if (orderState === 'CLOSED') {
                                                                            orderIcon = <i className="far fa-check-circle fa-3x p-inherit"></i>
                                                                        }
                                                                        return <tr className="gradeA odd" key={ item.id } role="row" onClick={ () => this.handleOrderDetail(item) }>
                                                                            <td className="sorting_1">
                                                                                {orderIcon}
                                                                            </td>
                                                                            <td>
                                                                                <div><strong>{item.id}
                                                                                    {item.orderReference ? ` / ${item.orderReference}`: '' }</strong></div>
                                                                                <small>{item.deviceSupplier + ' ' + item.deviceLabel}</small><br/>
                                                                                <small>{item.deviceSerialnumber}</small>                                                    
                                                                            </td>
                                                                            <td>{moment(item.created_at).calendar()}</td>
                                                            
                                                                        </tr>
                                                                    } else if (item.fulfilmentOrderTrackingNumber !== null) {
                                                                        if (item.fulfilmentOrderTrackingNumber.trackingNumber.includes(this.state.searchQRCode)) {

                                                                            let orderIcon = <i className="fa fa-wrench fa-3x p-inherit"></i>

                                                                            if (orderState === 'ASSESSMENT' || orderState === 'FULFILLMENT') {
                                                                                orderIcon = <i className="fa fa-wrench fa-3x p-inherit"></i>
                                                                            } else if (orderState === 'CONFIRMED') {
                                                                                orderIcon = <i className="fa fa-inbox fa-3x p-inherit"></i>
                                                                            } else if (orderState === 'RECEIVED') {
                                                                                orderIcon = <i className="fa fa-list-alt fa-3x p-inherit"></i>
                                                                            } else if (orderState === 'APPROVED') {
                                                                                orderIcon = <i className="fa fa-play-circle fa-3x p-inherit"></i>
                                                                            } else if (orderState === 'READY_FOR_SHIPMENT') {
                                                                                orderIcon = <i className="fa fa-truck fa-3x p-inherit"></i>
                                                                            } else if (orderState === 'APPROVAL_COST_ESTIMATE') {
                                                                                orderIcon = <i className="fa fa-spinner fa-3x p-inherit"></i>
                                                                            } else if (orderState === 'CLOSED') {
                                                                                orderIcon = <i className="far fa-check-circle fa-3x p-inherit"></i>
                                                                            }
                                                                
                                                                            return <tr className="gradeA odd" key={ item.id } role="row" onClick={ () => this.handleOrderDetail(item) }>
                                                                                <td className="sorting_1">
                                                                                    {orderIcon}
                                                                                </td>
                                                                                <td>
                                                                                    <div><strong>{item.id}
                                                                                        {item.orderReference ? ` / ${item.orderReference}`: '' }</strong></div>
                                                                                    <small>{item.deviceSupplier + ' ' + item.deviceLabel}</small><br/>
                                                                                    <small>{item.deviceSerialnumber}</small>                                                    
                                                                                </td>
                                                                                <td>{moment(item.created_at).calendar()}</td>
                                                                
                                                                            </tr>   
                                                                        }
                                                                    }
                                                                }
                                                                return null
                                                            })
                                                        }
                                                
                                                    </tbody>
                                            
                                                </table>
                                    
                                            </div>
                                        </div>
                                    </div>
                            
                                ) : t('order.not_found')}
            
                            </div>    
                        </div>
                    </div>
                    {this.state.toggleFilter 
                        ? <SearchFilter 
                            handleSelectFilter={ this.handleSelectFilter } 
                            handleClose={ this.handleClose } 
                            seletectType={ this.state.seletectType }
                            currentState={ this.props.searchType }
                            sort={ this.props.sort }
                        /> : ''
                    }
                </div>
            </div></div></div></div>

        )
    }
}

export default withNamespaces()(OrderDashboard)
