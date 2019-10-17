/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import TopNavContainer from 'containers/elements/TopNavContainer'
import TopBanner from 'components/elements/TopBanner'
import { Collapse } from 'react-collapse'
import { WithContext as ReactTags } from 'components/elements/tag/ReactTags'
import Loader from 'components/elements/Loader'

const KeyCodes = {
    comma: 188,
    enter: 13,
}
const delimiters = [KeyCodes.comma, KeyCodes.enter]

class OrderDetailPage extends Component {
    state = {
        type: 'invoice_device',
        file: null,
        itemType: 'shipping',
        itemReference: '',
        itemDescription: '',
        itemName: '',
        eventName: '',
        questionTitle: '',
        showGallery: false,
        isShowTotalCharge: false,
        isShowShippingAddress: false,
    }
    
    componentDidMount() {
        this.props.orderDetail(this.props.match.params.qrcode)
    }

    handleDelete = (i) => {
        if (this.props.fulfilmentOrder.fulfilmentOrderState.key !== 'CLOSED') {
            this.props.deleteTag(this.props.fulfilmentOrder, i)
        }
        
    }

    handleClick = (i, e) => {
        if (i === '-1') {
            history.push('/add-tag/' + this.props.fulfilmentOrder.id)
        }
    }

    handleAddition = (tag) => {
        this.setState(state => ({ tags: [...state.tags, tag] }))
    }

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags]
        const newTags = tags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)

        // re-render
        this.setState({ tags: newTags })
    }
    
    handleTakePicture = (e) => {

        if (this.props.fulfilmentOrder.fulfilmentOrderState.key === 'FULFILLED_COMPLETED' || this.props.fulfilmentOrder.fulfilmentOrderState.key === 'CLOSED') {
            return
        }
        if (this.props.fulfilmentOrder.fulfilmentOrderState.key === 'CONFIRMED') {
            history.push('/checkin/' + this.props.match.params.qrcode)
        } else {
            history.push('/takepicture/' + this.props.match.params.qrcode)
        }
    }

    handleShowGallery = (e) => {

        const { fulfilmentOrder } = this.props
        if (fulfilmentOrder && fulfilmentOrder.fulfilmentOrderPictures.length > 0) {
            history.push({pathname: `/show-gallery`, state: {pictures: this.props.fulfilmentOrder.fulfilmentOrderPictures, claimReference: this.props.fulfilmentOrder.claimReference}})
        }
        
    }

    handleShowQuestion = (questionId) => {
        history.push('/show-question/' + this.props.fulfilmentOrder.id + '/' + questionId)
    }

    handleShowItem = (ItemId) => {
        history.push('/show-item/' + this.props.fulfilmentOrder.id + '/' + ItemId)
    }

    handleCheckIn = (e) => {
        history.push('/checkin/' + this.props.match.params.qrcode)
    }

    handleStartAssessment = (e) => {

        history.push('/addnewitem/' + this.props.fulfilmentOrder.id)
    }

    handleAddItem = (e) => {
        history.push('/orderitemlist/' + this.props.match.params.qrcode)
    }
    
    handleSendForApproval = (e) => {
        localStorage.setItem('workingitem', this.props.fulfilmentOrder.id)
        this.props.addEvent(this.props.fulfilmentOrder.id, 'APPROVAL_COST_ESTIMATE')
        history.push('/assessment-complete/' + this.props.match.params.qrcode)
    }

    handleApproval = (e) => {
        this.props.addEvent(this.props.fulfilmentOrder.id, 'APPROVED')
    }

    handleProcessing = (e) => {
        this.props.addEvent(this.props.fulfilmentOrder.id, 'FULFILLMENT')
        history.push('/processing-items/' + this.props.match.params.qrcode)
    }

    // shipping finalize,
    handleFinalize = (e) => {
        history.push('/finalize-order/' + this.props.match.params.qrcode)
    }

    handleGoDashboard = (e) => {
        history.push('/order-dashboard/' + this.props.searchType)
    }

    handleEditReturnInfo = (e) => {
        history.push('/edit-return/' + this.props.match.params.qrcode)
    }

    handleGoLeft = (e) => {

        const { fulfilmentOrders } = this.props

        let filteredOrders = fulfilmentOrders
        
        if (this.props.match.params.from === 'query') {

            filteredOrders = fulfilmentOrders.filter(item => {
                
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
        }
        
        let beforeItem = null
        let receivedOrders = filteredOrders

        if (this.props.searchType !== 'ALL')
            receivedOrders = filteredOrders.filter((item) => item.fulfilmentOrderState.key === this.props.searchType)

        if (this.props.searchType === 'FULFILLMENT') {
            const receivedOrders1 = filteredOrders.filter((item) => item.fulfilmentOrderState.key === 'ASSESSMENT')
            receivedOrders = receivedOrders.concat(receivedOrders1)
        }

        if (this.props.searchType === 'RECEIVED') {
            const receivedOrders1 = filteredOrders.filter((item) => item.fulfilmentOrderState.key === 'ASSESSMENT')
            receivedOrders = receivedOrders.concat(receivedOrders1)
        }

        if (this.props.sort === 'nof' || this.props.sort === 'nqf') {
            receivedOrders = receivedOrders.sort( (a, b) => {
                return new Date(b.created_at) - new Date(a.created_at)
            })
        } else if (this.props.sort === 'oof' || this.props.sort === 'oqf') {
            receivedOrders = receivedOrders.sort( (a, b) => {
                return new Date(a.created_at) - new Date(b.created_at)
            })
        } else if (this.props.sort === 'ouf') {
            receivedOrders = receivedOrders.sort( (a, b) => {
                return new Date(a.updated_at) - new Date(b.updated_at)
            })
        } else if (this.props.sort === 'nuf') {
            receivedOrders = receivedOrders.sort( (a, b) => {
                return new Date(b.updated_at) - new Date(a.updated_at)
            })
        }

        const index = receivedOrders.findIndex( item => item.id === this.props.fulfilmentOrder.id)
        if (index > 0 && index < receivedOrders.length) {
            beforeItem = receivedOrders[index - 1]
        }

        if (beforeItem) {
            history.push('/order-detail/' + beforeItem.qrcode + '/' + this.props.match.params.from)
            this.props.orderDetail(beforeItem.qrcode)
        }
    }

    handleGoRight = (e) => {

        const { fulfilmentOrders } = this.props

        let filteredOrders = fulfilmentOrders
        
        if (this.props.match.params.from === 'query') {

            filteredOrders = fulfilmentOrders.filter(item => {
                
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
        }

        let nextItem = null

        let receivedOrders = filteredOrders

        if (this.props.searchType !== 'ALL')
            receivedOrders = filteredOrders.filter((item) => item.fulfilmentOrderState.key === this.props.searchType)

        if (this.props.searchType === 'FULFILLMENT') {
            const receivedOrders1 = filteredOrders.filter((item) => item.fulfilmentOrderState.key === 'ASSESSMENT')
            receivedOrders = receivedOrders.concat(receivedOrders1)
        }

        if (this.props.searchType === 'RECEIVED') {
            const receivedOrders1 = filteredOrders.filter((item) => item.fulfilmentOrderState.key === 'ASSESSMENT')
            receivedOrders = receivedOrders.concat(receivedOrders1)
        }

        if (this.props.sort === 'nof' || this.props.sort === 'nqf') {
            
            receivedOrders = receivedOrders.sort( (a, b) => {
                return new Date(b.created_at) - new Date(a.created_at)
            })
        } else if (this.props.sort === 'oof' || this.props.sort === 'oqf') {
            receivedOrders = receivedOrders.sort( (a, b) => {
                return new Date(a.created_at) - new Date(b.created_at)
            })
        } else if (this.props.sort === 'ouf') {
            receivedOrders = receivedOrders.sort( (a, b) => {
                return new Date(a.updated_at) - new Date(b.updated_at)
            })
        } else if (this.props.sort === 'nuf') {
            receivedOrders = receivedOrders.sort( (a, b) => {
                return new Date(b.updated_at) - new Date(a.updated_at)
            })
        }

        const index = receivedOrders.findIndex( item => item.id === this.props.fulfilmentOrder.id)
        if (index >= 0 && index < receivedOrders.length-1) {
            nextItem = receivedOrders[index + 1]
        }

        if (nextItem) {
            history.push('/order-detail/' + nextItem.qrcode + '/' + this.props.match.params.from)
            this.props.orderDetail(nextItem.qrcode)
        }
    }

    handleQuery = (e) => {
        history.push('/query-detail/' + this.props.match.params.qrcode)
    }
    render() {
        const {t, fulfilmentOrders} = this.props
        const { suggestions } = this.state
        const { fulfilmentOrder } = this.props

        let duedateLeft = ''
        if (fulfilmentOrder) {
            const dueDate = new Date(fulfilmentOrder.dueDate)
            const toDate = new Date()
            const timediff = Math.abs(dueDate.getTime() - toDate.getTime())
            duedateLeft = Math.ceil(timediff / (1000 * 3600 * 24))
        }

        let totalBookings = 0
        let bookItem = ''
        if (fulfilmentOrder && fulfilmentOrder.fulfilmentOrderItems) {
            for (let i = 0; i < fulfilmentOrder.fulfilmentOrderItems.length; i ++) {
                const item = fulfilmentOrder.fulfilmentOrderItems[i]
                
                for (let j = 0; j < item.fulfilmentOrderBookings.length; j ++) {
                    const booking = item.fulfilmentOrderBookings[j]
                    totalBookings += Number(booking.price) * Number(booking.quantity)
                }
            }

            bookItem = fulfilmentOrder.fulfilmentOrderItems.map((item, key) => {
                return (
                    <div className='row' key={ key }>
                    { item.fulfilmentOrderBookings.length > 0 
                        ? <div className='col-lg-12 ml-4'>{item.fulfilmentOrderBookings[0].quantity} &#215; {item.name} { Number(item.fulfilmentOrderBookings[0].quantity * item.fulfilmentOrderBookings[0].price).toFixed(2) }</div>
                        : ''
                    }
                        
                    </div>
                )
            })
        }

        let shippingInfo = ''

        if (fulfilmentOrder && fulfilmentOrder.fulfilmentOrderDelivery) {

            if (fulfilmentOrder.fulfilmentOrderDelivery.deliveryInboundType.key !== 'DHL') {
                shippingInfo = <div className='row'>
                    <div className='col-lg-12 ml-4'>
                        { t('order.customer_pickup') }<br/>
                    </div>
                </div>
            } else {
                shippingInfo = <div className='row'>
                    <div className='col-lg-12 ml-4'>
                        {fulfilmentOrder.fulfilmentOrderDelivery.deliveryInboundType.key}<br/>
                        {fulfilmentOrder.fulfilmentOrderDelivery.firstname} {fulfilmentOrder.fulfilmentOrderDelivery.lastname}, {fulfilmentOrder.fulfilmentOrderDelivery.company}<br/>
                        {fulfilmentOrder.fulfilmentOrderDelivery.street}<br/>
                        {fulfilmentOrder.fulfilmentOrderDelivery.zip}, {fulfilmentOrder.fulfilmentOrderDelivery.city}<br/>
                        {fulfilmentOrder.fulfilmentOrderDelivery.country === 'DE' ? 'Germany': ''}<br/>
                    </div>
                </div>
            }
                
        }

        // event button
        let eventButton = ''
        
        let countOfQuestion = 0

        // bottom buttons for checking disable
        let beforeDisable = true
        let nextDisable = true

        if (fulfilmentOrder && fulfilmentOrders) {
            if (fulfilmentOrder.fulfilmentOrderState.key === 'CONFIRMED') {
                eventButton = <button type='button' className='btn btn-warning btn-sm btn-block' onClick={ (e) => this.handleCheckIn(e) }>{t('order.checkin_now')}</button>
            } else if (fulfilmentOrder.fulfilmentOrderState.key === 'RECEIVED') {
                eventButton = <button type='button' className='btn btn-warning btn-sm btn-block' onClick={ (e) => this.handleStartAssessment(e) }>{t('order.start_assessment')}</button>
            } else if (fulfilmentOrder.fulfilmentOrderState.key === 'ASSESSMENT') {
                eventButton = <button type='button' className='btn btn-warning btn-sm btn-block' onClick={ (e) => this.handleSendForApproval(e) }>{t('order.send_approval')}</button>
            } else if (fulfilmentOrder.fulfilmentOrderState.key === 'APPROVAL_COST_ESTIMATE') {
                if (this.props.userRole.supplierId !== null) {
                    eventButton = <button type='button' className='btn btn-warning btn-sm btn-block' onClick={ (e) => this.handleApproval(e) }>{t('order.approve')}</button>
                }
            } else if (fulfilmentOrder.fulfilmentOrderState.key === 'APPROVED' || fulfilmentOrder.fulfilmentOrderState.key === 'FULFILLMENT') {
                eventButton = <button type='button' className='btn btn-danger btn-sm btn-block' onClick={ (e) => this.handleProcessing(e) }>{t('order.start_processing')}</button>
            } else if (fulfilmentOrder.fulfilmentOrderState.key === 'READY_FOR_SHIPMENT') {
                eventButton = <button type='button' className='btn btn-purple btn-sm btn-block' onClick={ (e) => this.handleFinalize(e) }>{t('order.finalize_order')}</button>
            } else if (fulfilmentOrder.fulfilmentOrderState.key === 'CLOSED') {
                eventButton = ''
            }

            /// count of question
            if (fulfilmentOrder.fulfilmentOrderDialogQuestions) {
                for (let j=0; j < fulfilmentOrder.fulfilmentOrderDialogQuestions.length; j++) {
                    const questionItem = fulfilmentOrder.fulfilmentOrderDialogQuestions[j]
    
                    if (questionItem.createdById !== this.props.user.userId && questionItem.fulfilmentOrderDialogAnswer === null ) {
                        countOfQuestion++
                    }
                
                }
            }

            //disable next, before btn
            
            let filteredOrders = fulfilmentOrders
            
            if (this.props.match.params.from === 'query') {

                filteredOrders = filteredOrders.filter(item => {
                    
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
            }
            
            if (fulfilmentOrder && this.props.searchType) {

                let receivedOrders = filteredOrders
                
                if (this.props.searchType !== 'ALL')
                    receivedOrders = filteredOrders.filter((item) => item.fulfilmentOrderState.key === this.props.searchType)

                if (this.props.searchType === 'FULFILLMENT') {
                    const receivedOrders1 = filteredOrders.filter((item) => item.fulfilmentOrderState.key === 'ASSESSMENT')
                    receivedOrders = receivedOrders.concat(receivedOrders1)
                }
    
                if (this.props.searchType === 'RECEIVED') {
                    const receivedOrders1 = filteredOrders.filter((item) => item.fulfilmentOrderState.key === 'ASSESSMENT')
                    receivedOrders = receivedOrders.concat(receivedOrders1)
                }
                
                if (this.props.sort === 'nof' || this.props.sort === 'nqf') {
            
                    receivedOrders = receivedOrders.sort( (a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at)
                    })
                } else if (this.props.sort === 'oof' || this.props.sort === 'oqf') {
                    receivedOrders = receivedOrders.sort( (a, b) => {
                        return new Date(a.created_at) - new Date(b.created_at)
                    })
                } else if (this.props.sort === 'ouf') {
                    receivedOrders = receivedOrders.sort( (a, b) => {
                        return new Date(a.updated_at) - new Date(b.updated_at)
                    })
                } else if (this.props.sort === 'nuf') {
                    receivedOrders = receivedOrders.sort( (a, b) => {
                        return new Date(b.updated_at) - new Date(a.updated_at)
                    })
                }

                const index = receivedOrders.findIndex( item => item.id === this.props.fulfilmentOrder.id)
                if (index > 0 && index < receivedOrders.length) {
                    beforeDisable = false
                }
                if (index >= 0 && index < receivedOrders.length-1) {
                    nextDisable = false
                }
            }
        }
        
        let tags = []

        if (fulfilmentOrder) {

            if (fulfilmentOrder.fulfilmentOrderState.key === 'CLOSED') {
                if (fulfilmentOrder.tags) {
                    tags = fulfilmentOrder.tags
                }
            } else {
                if (fulfilmentOrder.tags) {
                    tags = [{ id: '-1', name: '+ new tag' }, ...fulfilmentOrder.tags]
                } else {
                    tags = [{ id: '-1', name: '+ new tag' }]
                }
            }
            
        }
        return (
            <div id='wrapper'><div id='page-wrapper'><TopNavContainer/><div className='wrapper wrapper-content'><div className='container'>
                <div className='row'>
                    <Loader loading={ this.props.loading } />
                    <div className='col-lg-12'>
                        
                        {fulfilmentOrder ? (
                            <div>
                                <TopBanner fulfilmentOrder={ fulfilmentOrder } handleShowGallery={ this.handleShowGallery } handleTakePicture={ this.handleTakePicture } />
                                
                                <div className='ibox-content'>

                                    {
                                        fulfilmentOrder.linkedOrder 
                                            ? <div className='row mt-2'>
                                                <div className='col-12 d-flex'>
                                                    <i className='fa fa-link w15px my-auto'></i>
                                                    <div className='ml-2  my-auto'>
                                                        { fulfilmentOrder.linkedOrder }
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                    }                                    

                                    <div className='row mt-2'>
                                        <div className='col-8 d-flex'>
                                            <i className='fa fa-flag-checkered w15px my-auto'></i>
                                            <div className='ml-2  my-auto'>
                                                {duedateLeft} {t('order.days_overdue')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mt-2'>
                                        <div className='col-12 d-flex' onClick={ (e) => this.setState(prevState => {
                                            return {isShowTotalCharge: !prevState.isShowTotalCharge} 
                                        }) }>
                                            <i className='fa fa-euro-sign w15px my-auto'></i>
                                            { 
                                                this.state.isShowTotalCharge
                                                    ? <div className='ml-2 btn-dropdown-up'>
                                                        {totalBookings} {t('order.total_charges')}
                                                    </div>
                                                    : <div className='ml-2 btn-dropdown-down'>
                                                        {totalBookings} {t('order.total_charges')}
                                                    </div>
                                            } 
                                        </div>
                                        <div className='col-12'>
                                            <Collapse isOpened={ this.state.isShowTotalCharge }>
                                                { bookItem }
                                            </Collapse>
                                        </div>
                                        
                                    </div>
                                    
                                    {
                                        fulfilmentOrder.fulfilmentOrderState.key === 'ASSESSMENT' 
                                            ? <div className='row mt-1 ml-1'>
                                                <div className='ml-4'>
                                                    <div className='btn btn-block btn-primary' onClick={ (e) => this.handleAddItem(e) }>+ {t('order.add_item')}</div>
                                                </div>
                                            </div>
                                            : ''
                                    }
                                    <div className='row mt-2'>
                                        <div className='col-12 d-flex'>
                                            <i className='fa fa-mobile-alt w15px my-auto'></i>
                                            <div className='ml-2'>
                                                {fulfilmentOrder.deviceLabel}, {fulfilmentOrder.deviceSupplier}, {fulfilmentOrder.deviceModel}, {fulfilmentOrder.deviceSerialnumber}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-12 d-flex'>
                                            <i className='fa fa-info mt-5x'></i>
                                            <div className='ml-2'>
                                                {fulfilmentOrder.fulfilmentOrderType.key}<br />
                                                {fulfilmentOrder.fulfilmentOrderDamageDetails[0].description}<br />
                                                {fulfilmentOrder.fulfilmentOrderDamageDetails[0].incidentPlace}<br />
                                                {fulfilmentOrder.note}
                                            </div>+
                                        </div>
                                    </div>

                                    <div className='row mt-2'>
                                        <div className='col-12 d-flex'>
                                            <i className='fa fa-tags w15px my-auto'></i>
                                            <div className='ml-2'>
                                                {
                                                    fulfilmentOrder.tags
                                                        ? <ReactTags tags={ tags }
                                                            allowDragDrop={ false }
                                                            suggestions={ suggestions }
                                                            handleDelete={ this.handleDelete }
                                                            handleTagClick={ this.handleClick }
                                                            handleAddition={ this.handleAddition }
                                                            handleDrag={ this.handleDrag }
                                                            delimiters={ delimiters } />
                                                        : <ReactTags tags={ tags }
                                                            allowDragDrop={ false }
                                                            suggestions={ suggestions }
                                                            handleDelete={ this.handleDelete }
                                                            handleTagClick={ this.handleClick }
                                                            handleAddition={ this.handleAddition }
                                                            handleDrag={ this.handleDrag }
                                                            delimiters={ delimiters } />
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mt-2'>
                                        <div className='col-12 d-flex'>
                                            <i className='fa fa-address-card mt-5x'></i>
                                            <div className='ml-2'>
                                                {fulfilmentOrder.fulfilmentOrderCustomer.customerFirstname} {fulfilmentOrder.fulfilmentOrderCustomer.customerFirstname},&nbsp; 
                                                {
                                                    fulfilmentOrder.fulfilmentOrderCustomer.customerCompany === null && fulfilmentOrder.fulfilmentOrderCustomer.customerCompany === '' 
                                                        ? ''
                                                        : fulfilmentOrder.fulfilmentOrderCustomer.customerCompany + ', '
                                                }{fulfilmentOrder.fulfilmentOrderCustomer.customerPhone}, <br />
                                                {fulfilmentOrder.fulfilmentOrderCustomer.customerEmail}<br />
                                                {fulfilmentOrder.fulfilmentOrderAddress.street}, {fulfilmentOrder.fulfilmentOrderAddress.zip} {fulfilmentOrder.fulfilmentOrderAddress.city} <br />

                                            </div>
                                        </div>
                                    </div>

                                    {
                                        fulfilmentOrder.fulfilmentOrderTrackingNumber 
                                            ? <div className='row'>
                                                <div className='col-12 d-flex'>
                                                    <i className='fa fa-truck fa-flip-horizontal mt-5x my-auto'></i>
                                                    <div className='ml-2'>
                                                        {fulfilmentOrder.fulfilmentOrderTrackingNumber.trackingNumber}                                        
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            : ''
                                    }

                                    <div className='row mt-1'>
                                        <div className='col-12 d-flex' onClick={ (e) => this.setState(prevState => {
                                            return {isShowShippingAddress: !prevState.isShowShippingAddress} 
                                        }) }>
                                            <i className='fa fa-truck mt-5x'></i>

                                            { 
                                                this.state.isShowShippingAddress
                                                    ? <div className='ml-2 btn-dropdown-up'>
                                                        {t('order.show_return_shipping')}
                                                    </div>
                                                    : <div className='ml-2 btn-dropdown-down'>
                                                        {t('order.show_return_shipping')}
                                                    </div>
                                            }
                                        </div>
                                        <div className='col-12 mt-1'>
                                            <Collapse isOpened={ this.state.isShowShippingAddress }>
                                                { shippingInfo }

                                                {
                                                    fulfilmentOrder.fulfilmentOrderState.key !== 'CLOSED' 
                                                        ? <div className='row'>
                                                            <div className='col-lg-12 ml-4'>
                                                                <button type='button' className='btn btn-white' onClick={ (e) => this.handleEditReturnInfo(e) }>{t('order.edit_return_info')}</button>
                                                            </div>
                                                        </div>
                                                        : ''
                                                }
                                                
                                            </Collapse>
                                        </div>
                                    </div>

                                    <div className='row mt-5'>
                                        <div className='col-8 d-flex'>
                                            {eventButton}
                                        </div>
                                        <div className='col-4'>
                                            <div className='btn btn-outline-info float-right' onClick={ (e) => this.handleQuery(e) }>
                                                <i className='fa fa-comments fa-3x'></i>
                                                {
                                                    countOfQuestion > 0 
                                                        ? <span className='label circle-badge bg-danger'>{countOfQuestion}</span>
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        this.props.searchType 
                                            ? <div className='footer fixed text-center' style={ { zIndex: '1002' } }>
                                                <button disabled={ beforeDisable } type='button' className='btn btn-white float-left' 
                                                    onClick={ (e) => this.handleGoLeft(e) }><i className='fa fa-chevron-left'></i></button>
                                                <button type='button' className='btn btn-link' onClick={ (e) => this.handleGoDashboard(e) }><i className='fa fa-ellipsis-h'></i> </button>
                                                <button disabled={ nextDisable } type='button' className='btn btn-white float-right' 
                                                    onClick={ (e) => this.handleGoRight(e) }><i className='fa fa-chevron-right'></i> </button>
                                            </div>
                                            : ''
                                    }
                                    
                                </div>
                            </div>
                    
                        ) : ''}
            
                    </div>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(OrderDetailPage)
