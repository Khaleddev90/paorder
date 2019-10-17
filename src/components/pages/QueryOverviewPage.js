import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import moment from 'moment'
import history from '../../history'
import Loader from 'components/elements/Loader'
import SearchFilter from './SearchFilter'
import TopNavContainer from 'containers/elements/TopNavContainer'
import 'moment/locale/de' // without this line it didn't work
class QueryOverviewPage extends Component {
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
        history.push('/order-detail/' + e.qrcode + '/query')
    }
    
    handlerToggle = (type) => {

        if (type === 'state')
            this.setState({toggleFilter : true, seletectType: type})
        else {
            if (this.props.sort === 'nqf')
                this.props.setSortType('oqf')
            else 
                this.props.setSortType('nqf')
        }

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
        }
        this.setState({toggleFilter : false})
    }
    render() {
        const { t, fulfilmentOrders } = this.props

        let titleState = t('common.all')

        if (this.props.searchType) {
            if (this.props.searchType === 'ASSESSMENT') {
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
            const filteredOrders = fulfilmentOrders.filter(item => {
                
                if (item.fulfilmentOrderDialogQuestions) {
                    for (let j=0; j < item.fulfilmentOrderDialogQuestions.length; j++) {
                        const questionItem = item.fulfilmentOrderDialogQuestions[j]
    
                        if (questionItem.createdById !== this.props.user.userId && questionItem.fulfilmentOrderDialogAnswer === null ) {
                            return item
                        }
                        
                    }
                    return null
                } else {
                    return null
                }
                
            })
    
            if (this.props.sort) {
                if (this.props.sort === 'nqf') {
                    titleSort = t('order.newest_query_first')
    
                    sortedOrders = filteredOrders.sort( (a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at)
                    })
                } else {
                    titleSort = t('order.oldest_query_first')
                    sortedOrders = filteredOrders.sort( (a, b) => {
                        return new Date(a.created_at) - new Date(b.created_at)
                    })
                }
            }
        }

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />
                    <div className="col-lg-12">
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>{t('order.Queries')}</h5>
                            </div>
                            <div className="ibox-content">
                                {fulfilmentOrders ? (
                                    <div>
                                        <div className="row mb-3">
                                            <div className="col-lg-12 mb-3">
                                                <input value={ this.state.searchQRCode } onChange={ (e) => this.setState({searchQRCode: e.target.value}) } type="text" 
                                                    placeholder={ t('common.search') } className="form-control" />
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
                                                                if (this.props.searchType === 'ALL' || item.fulfilmentOrderState.key === this.props.searchType ||
                                                    (this.props.searchType === 'ASSESSMENT' && item.fulfilmentOrderState.key === 'FULFILLMENT')) {
                                                                    if (item.id.toString().toLowerCase().includes(this.state.searchQRCode.toLowerCase()) ||
                                                        (item.externalReference && item.externalReference.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.fulfilmentOrder && item.deviceLabel.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.fulfilmentOrder && item.deviceSupplier.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.fulfilmentOrder && item.deviceSerialnumber.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.fulfilmentOrder && item.customer.customerFirstname.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.fulfilmentOrder && item.customer.customerLastname.toLowerCase().includes(this.state.searchQRCode.toLowerCase())) ||
                                                        (item.fulfilmentOrder && item.customer.customerEmail.toLowerCase().includes(this.state.searchQRCode.toLowerCase()))) {

                                                                        let orderIcon = <i className="fa fa-wrench fa-3x p-inherit"></i>

                                                                        if (item.fulfilmentOrderState.key === 'ASSESSMENT' || item.fulfilmentOrderState.key === 'FULFILLMENT') {
                                                                            orderIcon = <i className="fa fa-wrench fa-2x p-inherit"></i>
                                                                        } else if (item.fulfilmentOrderState.key === 'CONFIRMED') {
                                                                            orderIcon = <i className="fa fa-inbox fa-2x p-inherit"></i>
                                                                        } else if (item.fulfilmentOrderState.key === 'RECEIVED') {
                                                                            orderIcon = <i className="fa fa-list-alt fa-2x p-inherit"></i>
                                                                        } else if (item.fulfilmentOrderState.key === 'APPROVED') {
                                                                            orderIcon = <i className="fa fa-play-circle fa-2x p-inherit"></i>
                                                                        } else if (item.fulfilmentOrderState.key === 'READY_FOR_SHIPMENT') {
                                                                            orderIcon = <i className="fa fa-truck fa-2x p-inherit"></i>
                                                                        } else if (item.fulfilmentOrderState.key === 'APPROVAL_COST_ESTIMATE') {
                                                                            orderIcon = <i className="fa fa-spinner fa-2x p-inherit"></i>
                                                                        } else if (item.fulfilmentOrderState.key === 'CLOSED') {
                                                                            orderIcon = <i className="far fa-check-circle fa-2x p-inherit"></i>
                                                                        }

                                                                        let unAnsweredQuestion = null
                                                                        for (let j=0; j < item.fulfilmentOrderDialogQuestions.length; j++) {
                                                                            const questionItem = item.fulfilmentOrderDialogQuestions[j]
                                            
                                                                            if (questionItem.createdById !== this.props.user.userId && questionItem.fulfilmentOrderDialogAnswer === null ) {
                                                                                unAnsweredQuestion = questionItem
                                                                            }
                                                                
                                                                        }

                                                                        let question = unAnsweredQuestion.value
                                                                        question = question.length > 25 ? question.substring(0, 22) + '...' : question

                                                                        return <tr className="gradeA odd" key={ item.id } role="row" onClick={ () => this.handleOrderDetail(item) }>
                                                                            <td className="sorting_1">
                                                                                {orderIcon}
                                                                            </td>
                                                                            <td>
                                                                                <div className="d-flex justify-content-between">
                                                                                    <strong>{item.id}
                                                                                        {item.orderReference ? ` / ${item.orderReference}`: '' }</strong>
                                                                                    {moment(unAnsweredQuestion.created_at).fromNow()}
                                                                                </div>
                                                                                <div>&nbsp;{item.deviceLabel}, {item.deviceSupplier}</div>
                                                                                <div className="ml-1 line-clamp"><i className="fa fa-comments mr-1"></i>{question}</div>
                                                                            </td>
                                                            
                                                                        </tr>
                                                                    } else if (item.fulfilmentOrderTrackingNumber !== null) {
                                                                        if (item.fulfilmentOrderTrackingNumber.trackingNumber.includes(this.state.searchQRCode)) {

                                                                            let orderIcon = <i className="fa fa-wrench fa-3x p-inherit"></i>

                                                                            if (item.fulfilmentOrderState.key === 'ASSESSMENT' || item.fulfilmentOrderState.key === 'FULFILLMENT') {
                                                                                orderIcon = <i className="fa fa-wrench fa-2x p-inherit"></i>
                                                                            } else if (item.fulfilmentOrderState.key === 'CONFIRMED') {
                                                                                orderIcon = <i className="fa fa-inbox fa-2x p-inherit"></i>
                                                                            } else if (item.fulfilmentOrderState.key === 'RECEIVED') {
                                                                                orderIcon = <i className="fa fa-list-alt fa-2x p-inherit"></i>
                                                                            } else if (item.fulfilmentOrderState.key === 'APPROVED') {
                                                                                orderIcon = <i className="fa fa-play-circle fa-2x p-inherit"></i>
                                                                            } else if (item.fulfilmentOrderState.key === 'READY_FOR_SHIPMENT') {
                                                                                orderIcon = <i className="fa fa-truck fa-2x p-inherit"></i>
                                                                            } else if (item.fulfilmentOrderState.key === 'APPROVAL_COST_ESTIMATE') {
                                                                                orderIcon = <i className="fa fa-spinner fa-2x p-inherit"></i>
                                                                            } else if (item.fulfilmentOrderState.key === 'CLOSED') {
                                                                                orderIcon = <i className="far fa-check-circle fa-2x p-inherit"></i>
                                                                            }
                                                                
                                                                            let unAnsweredQuestion = null
                                                                            for (let j=0; j < item.fulfilmentOrderDialogQuestions.length; j++) {
                                                                                const questionItem = item.fulfilmentOrderDialogQuestions[j]
                                                
                                                                                if (questionItem.createdById !== this.props.user.userId && questionItem.fulfilmentOrderDialogAnswer === null ) {
                                                                                    unAnsweredQuestion = questionItem
                                                                                }
                                                                    
                                                                            }
                                                                            let question = unAnsweredQuestion.value
                                                                            question = question.length > 25 ? question.substring(0, 22) + '...' : question

                                                                            return <tr className="gradeA odd" key={ item.id } role="row" onClick={ () => this.handleOrderDetail(item) }>
                                                                                <td className="sorting_1">
                                                                                    {orderIcon}
                                                                                </td>
                                                                                <td>
                                                                                    <div className="d-flex justify-content-between">
                                                                                        <strong>{item.id}
                                                                                            {item.orderReference ? ` / ${item.orderReference}`: '' }</strong>
                                                                                        {moment(unAnsweredQuestion.created_at).fromNow()}
                                                                                    </div>
                                                                                    <div>&nbsp;{item.deviceLabel}, {item.deviceSupplier}</div>
                                                                                    <div className="ml-1 line-clamp"><i className="fa fa-comments mr-1"></i>{question}</div>
                                                                                </td>
                                                                
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

export default withNamespaces()(QueryOverviewPage)
