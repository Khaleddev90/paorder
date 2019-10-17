import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class FinalizeOrderNotrackingPage extends Component {
    state = {
        orderItem: null,
        trackingNumber: '',
        error: null,
    }

    componentDidMount() {
        if (!this.props.fulfilmentOrders) {
            history.push('/')
            return
        }
        const orderItem = this.props.fulfilmentOrders.find((el) =>
            el.qrcode === this.props.match.params.qrcode
        )
        this.setState({orderItem: orderItem})
    }
    
    handleClose = (e) => {
        history.goBack()
    }

    handleNext = (e) => {
        const {t} = this.props

        if (this.state.trackingNumber === '') {
            this.setState({error: t('error.valid_tracking_number')})
            return
        }
        this.setState({error: null})

        this.props.addTrackingNumber(
            this.state.orderItem.id,
            this.state.trackingNumber,
            'customer_to_repair_shop',
            'dhl'
        )
        return
        
    }

    render() {
        const {t} = this.props
        const { orderItem } = this.state
        
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />
                    {orderItem ? (
                        <div className="col-lg-12">
                            <div className="tracking-div">
                                <div className="row">
                                    <div className="col-lg-12 text-muted">
                                        {t('order.desc_finalize_notracking')}
                                    </div>
                                    <hr/>

                                    <div className="col-lg-12 mb-2">
                                        <h2>{t('order.enter_tracking_number')}</h2>
                                        <h3>{t('order.delivery_to')}</h3>
                                        {orderItem ? <div>
                                            <h3>{orderItem.fulfilmentOrderDelivery.firstname} {orderItem.fulfilmentOrderDelivery.lastname}</h3>
                                            <h3>{orderItem.fulfilmentOrderDelivery.street}</h3>
                                            <h3>{orderItem.fulfilmentOrderDelivery.zip} {orderItem.fulfilmentOrderDelivery.city}</h3></div>
                                            :''}
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <h2>{t('order.enter_tracking_number')}</h2>
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="text" placeholder={ t('order.tracking_number') } className="form-control" value={ this.state.trackingNumber } 
                                            onChange={ (e) => this.setState({trackingNumber: e.target.value, error: null}) }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center d-flex mt-3">
                                
                                <button type="button" className="btn-notshipped" onClick={ (e) => this.handleNext(e) }>{t('order.device_was_not_shipped')}</button>
                                
                            </div>
                        </div>            
                    ) : ''}
            
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(FinalizeOrderNotrackingPage)
