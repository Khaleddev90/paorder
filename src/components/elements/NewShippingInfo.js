import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
class NewShippingInfo extends Component {

    handleEdit = (type) => {
        this.props.handleEdit(type)
    }

    render() {
        const {t, handleClose, delivery } = this.props

        return (
            <div style={ { marginLeft: '30px'} }>
                <div className='header fixed text-center d-flex'>
                    <div className='col-lg-12'>
                        <h2>{t('order.edit_return_info')}</h2>
                        
                    </div>
                    <button type='button' className='btn btn-link btn-close' onClick={ (e) => handleClose(e) }><i className='fa fa-times fa-3x'></i></button>
                </div>

                {   
                    <div className='row mt-1'>
                        <div className='col-6'>
                            <h4><strong>{ t('order.return_method') }:</strong></h4>
                        </div>
                        <div className='col-4'>
                            {delivery.deliveryInboundType.key === 'DHL' ? 'DHL': 'Customer pickup'}
                        </div>
                        <div className='col-2'>
                            <button type="button" className="btn btn-link " onClick={ (e) => this.handleEdit('returnMethod') }><i className="fa fa-pencil-alt"></i></button>
                        </div>
                    </div>
                }
                {
                    delivery.deliveryInboundType.key === 'DHL'
                        ? <div className='row mt-1'>
                            <div className='col-6'>
                                <h4><strong>{ t('order.first_name') }:</strong></h4>
                            </div>
                            <div className='col-4'>
                                {delivery.firstname}
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-link " onClick={ (e) => this.handleEdit('fistName') }><i className="fa fa-pencil-alt"></i></button>
                            </div>
                            
                        </div>
                        : ''
                }

                {
                    delivery.deliveryInboundType.key === 'DHL'
                        ? <div className='row mt-1'>
                            <div className='col-6'>
                                <h4><strong>{ t('order.last_name') }:</strong></h4>
                            </div>
                            <div className='col-4'>
                                {delivery.lastname}
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-link " onClick={ (e) => this.handleEdit('lastName') }><i className="fa fa-pencil-alt"></i></button>
                            </div>
                        </div>
                        : ''
                }

                {
                    delivery.deliveryInboundType.key === 'DHL'
                        ? <div className='row mt-1'>
                            <div className='col-6'>
                                <h4><strong>{ t('order.company') }:</strong></h4>
                            </div>
                            <div className='col-4'>
                                {delivery.company}
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-link " onClick={ (e) => this.handleEdit('company') }><i className="fa fa-pencil-alt"></i></button>
                            </div>
                        </div>
                        : ''
                }

                {
                    delivery.deliveryInboundType.key === 'DHL'
                        ? <div className='row mt-1'>
                            <div className='col-6'>
                                <h4><strong>{ t('order.street') }:</strong></h4>
                            </div>
                            <div className='col-4'>
                                {delivery.street}
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-link " onClick={ (e) => this.handleEdit('street') }><i className="fa fa-pencil-alt"></i></button>
                            </div>
                        </div>
                        : ''
                }

                {
                    delivery.deliveryInboundType.key === 'DHL'
                        ? <div className='row mt-1'>
                            <div className='col-6'>
                                <h4><strong>{ t('order.zip') }:</strong></h4>
                            </div>
                            <div className='col-4'>
                                {delivery.zip}
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-link " onClick={ (e) => this.handleEdit('zip') }><i className="fa fa-pencil-alt"></i></button>
                            </div>
                        </div>
                        : ''
                }

                {
                    delivery.deliveryInboundType.key === 'DHL'
                        ? <div className='row mt-1'>
                            <div className='col-6'>
                                <h4><strong>{ t('order.city') }:</strong></h4>
                            </div>
                            <div className='col-4'>
                                {delivery.city}
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-link " onClick={ (e) => this.handleEdit('city') }><i className="fa fa-pencil-alt"></i></button>
                            </div>
                        </div>
                        : ''
                }

                {
                    delivery.deliveryInboundType.key === 'DHL'
                        ? <div className='row mt-1'>
                            <div className='col-6'>
                                <h4><strong>{ t('order.country') }:</strong></h4>
                            </div>
                            <div className='col-4'>
                                {delivery.country === 'DE' ? 'Germany': ''}
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-link " onClick={ (e) => this.handleEdit('country') }><i className="fa fa-pencil-alt"></i></button>
                            </div>
                        </div>
                        : ''
                }
            </div>
            
        )

    }
}

export default withNamespaces()(NewShippingInfo)
