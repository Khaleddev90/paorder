import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class FinalizeOrderPage extends Component {
    state = {
        orderItem: null,
        trackingNumber: '',
        error: null,
        noTracking: false,
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

    handleNoShipment = (e) => {
        localStorage.setItem('workingitem', this.state.orderItem.id)
        this.props.addEvent(this.state.orderItem.id, 'CLOSED')
        history.push('/order-complete/' + this.state.orderItem.id)
    }

    handleNext = (e) => {
        if (this.state.trackingNumber === '') {
            if (this.state.noTracking) {
                return
            } else {
                this.setState({noTracking: true})
                return
            }
            
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

        const InputItem = <div className="input-item-div">
            <div className="row">
                {
                    this.state.noTracking 
                        ? <div className="col-lg-12 text-muted">
                            {t('order.desc_finalize_notracking')}
                        </div>
                        : ''
                }
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
                {
                    this.state.error 
                        ? <div className="col-lg-12 text-danger">
                            {this.state.error}
                        </div>
                        : ''
                }                    
                <div className="col-lg-12 text-muted">
                    {t('order.desc_tracking')}
                </div>

                {
                    this.state.noTracking 
                        ? <div className="col-lg-12">
                            <div className="text-center d-flex mt-3">
                                <button type="button" className="btn-notshipped" onClick={ (e) => this.handleNoShipment(e) }>{t('order.device_was_not_shipped')}</button>
                            </div>
                        </div>
                        : ''}
            </div>
        </div>
        
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />
                    {orderItem ? (
                        <div className="col-lg-12">
                            
                            {InputItem}
                            
                            <div className="footer fixed text-center d-flex" style={ {zIndex: '1002'} }>
                                <button type="button" className="btn btn-link float-left m-3" onClick={ (e) => this.handleClose(e) }><i className="fa fa-chevron-left fa-3x"></i></button>
                                
                                <button type="button" className="btn-item-add btn-purple" onClick={ (e) => this.handleNext(e) }>{t('order.close_order')}</button>
                                
                            </div>
                        </div>            
                    ) : ''}
            
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(FinalizeOrderPage)
