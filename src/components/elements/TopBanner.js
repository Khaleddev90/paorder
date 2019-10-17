import React, {Component} from 'react'
import { Carousel } from 'react-responsive-carousel'
import { withNamespaces } from 'react-i18next'
import Image from 'components/elements/Image'

class TopBanner extends Component {

    componentDidMount() {

    }

    render() {
        const { t, fulfilmentOrder, handleShowGallery, handleTakePicture, final } = this.props

        const noImage = fulfilmentOrder && fulfilmentOrder.fulfilmentOrderPictures.length > 0 ? false: true

        let eventLabel = ''

        if (fulfilmentOrder.fulfilmentOrderState.key === 'CONFIRMED') {
            eventLabel = <h5>{t('order.waiting_checkin')}</h5>
        } else if (fulfilmentOrder.fulfilmentOrderState.key === 'RECEIVED') {
            eventLabel = <h5>{t('order.checkedin')}</h5>
        } else if (fulfilmentOrder.fulfilmentOrderState.key === 'ASSESSMENT') {
            eventLabel = <h5>{t('order.ready_sending_approval')}</h5>
        } else if (fulfilmentOrder.fulfilmentOrderState.key === 'APPROVAL_COST_ESTIMATE') {
            eventLabel = <h5>{t('order.pending_approval')}</h5>
        } else if (fulfilmentOrder.fulfilmentOrderState.key === 'APPROVED' || fulfilmentOrder.fulfilmentOrderState.key === 'FULFILLMENT') {
            eventLabel = <h5>{t('order.waiting_for_processing')}</h5>
        } else if (fulfilmentOrder.fulfilmentOrderState.key === 'READY_FOR_SHIPMENT') {
            eventLabel = <h5>{t('order.ready_for_shippment')}</h5>
        } else if (fulfilmentOrder.fulfilmentOrderState.key === 'CLOSED') {
            eventLabel = <h5>{t('order.closed')}</h5>
        }

        let slides = null
        
        if (fulfilmentOrder && fulfilmentOrder.fulfilmentOrderPictures.length > 0) {
            slides = fulfilmentOrder.fulfilmentOrderPictures.map((item, key) => {
                return (
                    <div className='gallery' key={ item.id }>
                        <Image pic={ item.filename } showGallery={ false }/>
                    </div>
                )
            })
        }

        return (
            <div className='position-relative'>
                <div>
                    {slides
                        ? <Carousel centerMode={ true } showThumbs={ false } showIndicators={ false } dynamicHeight={ false }>
                            {slides}
                        </Carousel>
                        : <div className='gallery' style={ {backgroundColor: 'white' } }></div>
                    }
                </div>
                
                <div className='order-header'>
                    <div className='row'>
                        <div className='col-6 d-flex'>
                            <div className='ml-2 blur-black'>
                                <h4><strong>{fulfilmentOrder.fulfilmentOrderType.key}</strong></h4>
                                <h4><strong>{fulfilmentOrder.externalReference}</strong></h4>
                                <h5>
                                    {fulfilmentOrder.id}
                                    {fulfilmentOrder.orderReference ? ` / ${fulfilmentOrder.orderReference}`: '' }
                                </h5>
                                {eventLabel}                                
                            </div>
                            
                        </div>
                        <div className='col-6'>
                            { noImage ? '' : <div className='btn halftransbg float-right' onClick={ (e) => handleShowGallery(e) }>
                                <i className='enableGallery'></i><br/><span className='blackh5'>{t('common.zoom')}</span></div>}
                            { final || fulfilmentOrder.fulfilmentOrderState.key === 'CLOSED' ? '' : <div className='btn halftransbg float-right' onClick={ (e) => handleTakePicture(e) }>
                                <i className={ fulfilmentOrder.fulfilmentOrderState.key === 'CLOSED' ? 'disableCamera': 'enableCamera' }></i><br/><span className='blackh5'>+{t('common.add')}</span></div>
                            }
                        </div>
                    </div>
                </div>

                {
                    fulfilmentOrder.fulfilmentOrderState.key === 'CLOSED' 
                        ? <div className='order-complete'>
                            <i className='fa fa-flag-checkered fa-9x m-auto'></i>
                        </div>
                        : ''
                }
            </div>
        )
    }
}

export default withNamespaces()(TopBanner)
