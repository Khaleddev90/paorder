import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NewShippingInfo from 'components/elements/NewShippingInfo'
import Option from 'components/elements/Option'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class EditReturnPage extends Component {
    state = {
        orderItem: null,
        shippingInfo: {},
    }
    componentDidMount() {
        this.props.orderDetail(this.props.match.params.qrcode)
    }
    
    componentWillReceiveProps(nextProps) {
        if (!nextProps.fulfilmentOrder) {
            history.push('/')
            return
        }
        const orderItem = nextProps.fulfilmentOrder
        this.setState({orderItem: orderItem})

        if (!orderItem) {
            history.push('/')
            return
        }
        const switched = orderItem.fulfilmentOrderDelivery.deliveryInboundType === 5 ? false: true
        
        const shippingInfo = {
            salutation: orderItem.fulfilmentOrderDelivery.salutation,
            firstname: orderItem.fulfilmentOrderDelivery.firstname,
            lastname: orderItem.fulfilmentOrderDelivery.lastname,
            company: orderItem.fulfilmentOrderDelivery.company,
            street: orderItem.fulfilmentOrderDelivery.street,
            city: orderItem.fulfilmentOrderDelivery.city,
            country: orderItem.fulfilmentOrderDelivery.country,
            zip: orderItem.fulfilmentOrderDelivery.zip,
            inboundTypeId: orderItem.fulfilmentOrderDelivery.deliveryInboundType.id,
        }

        this.setState({switched, orderItem, shippingInfo, error: nextProps.error})

    }
    
    handleAddItem =(e) => {
        if (this.state.itemName === '') {
            return
        }
    } 
    
    handleClose = (e) => {
        history.goBack()
    }

    handleBack = (e) => {

        if (this.props.currentlyEdit === 'none') {
            history.goBack()
        } else {
            this.props.setCurrentlyEdit('none')
        }        
    }

    handleNext = (e) => {
        
        this.props.updateDeliveryAddress(this.state.orderItem, this.state.shippingInfo)

    }

    handleEdit = (type) => {
        this.props.setCurrentlyEdit(type)
    }

    handleChangeType = (type) => {
        this.setState(prevState => {
            const shippingInfo = prevState.shippingInfo
            shippingInfo.inboundTypeId = type
            return { shippingInfo }
        })
    }

    handleChangeCountry = (country) => {
        // console.log(country)
        this.setState(prevState => {
            const shippingInfo = prevState.shippingInfo
            shippingInfo.country = country
            return { shippingInfo }
        })
    }
    
    handleChangeInput = (field, e) => {

        const value = e.target.value
        
        this.setState(prevState => {
            const shippingInfo = prevState.shippingInfo
            shippingInfo[field] = value
            return { shippingInfo }
        })
    }
    render() {
        const {t} = this.props
        const { orderItem, shippingInfo } = this.state

        let InputItem = ''
        if (!orderItem) {
            return ''
        }

        const switched = shippingInfo.inboundTypeId === 5 ? false: true
        if (this.props.currentlyEdit === 'returnMethod') {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.select_return_method')}</h2>
                    </div>
                    
                    <div className="col-12">
                        <Option onCheckItem={ e => this.handleChangeType(1) } checked={ switched } label={ t('order.customer_pickup') }/>
                    </div>
                    <hr></hr>
                    <div className="col-12">
                        <Option onCheckItem={ e => this.handleChangeType(5) } checked={ !switched } label={ t('order.DHL') }/>
                    </div>
                
                </div>
            </div>
        } else if (this.props.currentlyEdit === 'fistName') {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_firstname')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="text" placeholder="name" className="form-control" value={ shippingInfo.firstname } 
                            onChange={ (e) => this.handleChangeInput('firstname', e) }
                        />
                    </div>
                    
                </div>
            </div>
        } else if (this.props.currentlyEdit === 'lastName') {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_lastname')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="text" placeholder="name" className="form-control" value={ shippingInfo.lastname } 
                            onChange={ (e) => this.handleChangeInput('lastname', e) }
                        />
                    </div>
                    
                </div>
            </div>
        } else if (this.props.currentlyEdit === 'company') {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_company')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="text" className="form-control" value={ shippingInfo.company } 
                            onChange={ (e) => this.handleChangeInput('company', e) }
                        />
                    </div>
                    
                </div>
            </div>
        } else if (this.props.currentlyEdit === 'street') {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_street')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="text" className="form-control" value={ shippingInfo.street } 
                            onChange={ (e) => this.handleChangeInput('street', e) }
                        />
                    </div>
                   
                </div>
            </div>
        } else if (this.props.currentlyEdit === 'zip') {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_zip')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="text" className="form-control" value={ shippingInfo.zip } 
                            onChange={ (e) => this.handleChangeInput('zip', e) }
                        />
                    </div>
                    {
                        this.state.error 
                            ? <div className="col-lg-12 text-danger">
                                {this.state.error}
                            </div>
                            : ''
                    }
                </div>
            </div>
        } else if (this.props.currentlyEdit === 'city') {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_city')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="text" className="form-control" value={ shippingInfo.city } 
                            onChange={ (e) => this.handleChangeInput('city', e) }
                        />
                    </div>
                </div>
            </div>
        } else if (this.props.currentlyEdit === 'country') {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.select_country')}</h2>
                    </div>
                    
                    <div className="col-12">
                        <Option value={ 'DE' } onCheckItem={ e => this.handleChangeCountry(e) } checked={ shippingInfo.country === 'DE' ? true: false } label={ t('common.germany') }/>
                    </div>
                
                </div>
            </div>
        }

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />
                    {orderItem ? (
                        <div className="col-lg-12">
                            <NewShippingInfo handleEdit={ this.handleEdit } delivery={ orderItem.fulfilmentOrderDelivery } handleClose={ this.handleClose }/>

                            {InputItem}
                            <div className="footer fixed text-center d-flex" style={ {zIndex: '1002', height: '106px'} }>
                                {
                                    
                                    <button type="button" className="btn btn-link float-left m-3" onClick={ (e) => this.handleBack(e) }><i className="fa fa-chevron-left fa-3x"></i></button>
                                    
                                }
                                {
                                    this.props.currentlyEdit === 'none'
                                        ? ''
                                        : <button type="button" className="btn-item-add" onClick={ (e) => this.handleNext(e) }>{t('common.save')}</button>
                                }
                            </div>
                        </div>            
                    ) : ''}
            
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(EditReturnPage)
