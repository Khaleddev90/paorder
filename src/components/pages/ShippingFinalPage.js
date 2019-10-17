import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'components/elements/Image'
import history from '../../history'
import TopNavContainer from 'containers/elements/TopNavContainer'
import Loader from 'components/elements/Loader'
import TopBanner from 'components/elements/TopBanner'

class ShippingFinalPage extends Component {
    state = {
        orderItem: null,
        type: 'invoice_device',
        file: null,
        itemType: 'shipping',
        itemReference: '',
        itemDescription: '',
        itemName: '',
        eventName: '',
        questionTitle: '',
        originOrders: null,
    }

    componentDidMount() {
        if (!this.props.fulfilmentOrders) {
            history.push('/')
            return
        }
        const orderItem = this.props.fulfilmentOrders.find((el) =>
            el.id === Number(this.props.match.params.fulfilmentId)
        )

        const workingitem = localStorage.getItem('workingitem')

        const originOrders = this.props.fulfilmentOrders.filter((item) => item.fulfilmentOrderState.key === 'READY_FOR_SHIPMENT'|| 
            Number(workingitem) === item.id)
        this.setState({orderItem: orderItem, originOrders})
        
    }
    handleGoDashboard = (e) => {
        history.push('/order-dashboard/READY_FOR_SHIPMENT')
    }

    handleGoBackOrder = (e) => {
        history.push('/order-detail/' + this.state.orderItem.qrcode + '/order')    
    }

    handleGoLeft = (e) => {
        let beforeItem = null
        let receivedOrders = this.state.originOrders

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

        const currentItem = receivedOrders.find(item => item.id === this.state.orderItem.id)
        const index = receivedOrders.indexOf(currentItem)
        if (index > 0 && index < receivedOrders.length) {
            beforeItem = receivedOrders[index - 1]
        }

        if (beforeItem) {
            history.push('/order-detail/' + beforeItem.qrcode + '/order')
        }
    }

    handleGoRight = (e) => {
        let nextItem = null
        let receivedOrders = this.state.originOrders

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
        
        const currentItem = receivedOrders.find(item => item.id === this.state.orderItem.id)
        const index = receivedOrders.indexOf(currentItem)
        if (index >= 0 && index < receivedOrders.length-1) {
            nextItem = receivedOrders[index + 1]
        }

        if (nextItem) {
            history.push('/order-detail/' + nextItem.qrcode + '/order')
        }
    }

    render() {
        const {t} = this.props
        const { orderItem } = this.state

        let slides = <div className="gallery" style={ {minHeight: '250px', backgroundColor: 'wheat'} }></div>
        
        if (orderItem && orderItem.fulfilmentOrderPictures.length > 0) {
            slides = orderItem.fulfilmentOrderPictures.map((item, key) => {
                return (
                    <div className="gallery" key={ key }>
                        <Image pic={ item.filename } />
                    </div>
                )
            })
        }

        // bottom buttons for checking disable
        let beforeDisable = true
        let nextDisable = true

        //disable next, before btn
            
        if (orderItem && this.state.originOrders) {
            let receivedOrders = this.state.originOrders

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

            const currentItem = receivedOrders.find(item => item.id === this.state.orderItem.id)
            const index = receivedOrders.indexOf(currentItem)
            if (index > 0 && index < receivedOrders.length) {
                beforeDisable = false
            }

            if (index >= 0 && index < receivedOrders.length-1) {
                nextDisable = false
            }
        }

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div>
                    <div className="row">
                        <Loader loading={ this.props.loading } />
                        <div className="col-lg-12">
                    
                            {orderItem ? (
                                <div>
                                    <div className="position-relative">
                                        <TopBanner slides={ slides } fulfilmentOrder={ orderItem } handleShowGallery={ this.handleShowGallery } handleTakePicture={ this.handleTakePicture } final={ true }/>
                                    </div>
                            
                                    <div className="ibox-content">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <i className="fa fa-smile fa-6x text-purple float-right"></i>
                                            </div>
                                            <div className="col-lg-12 text-purple">
                                                <h2 className="float-right">{t('order.order_complete')}!</h2>
                                            </div>
                                            <div className="col-lg-12">
                                                <button type="button" disabled={ nextDisable && beforeDisable } className="btn btn-purple btn-lg mt-5 float-right" 
                                                    onClick={ (e) => !nextDisable? this.handleGoRight(e): this.handleGoLeft() }>{t('order.next_shippment')} &gt;</button>
                                            </div>
                                            <div className="col-lg-12">
                                                <button type="button" className="btn btn-primary btn-lg mt-5" onClick={ (e) => this.handleGoBackOrder(e) }> &#60; {t('order.go_back_order')} </button>
                                            </div>
                                        </div>
                                        <div className="footer fixed text-center" style={ {zIndex: '1002'} }>
                                            <button disabled={ beforeDisable } type="button" className="btn btn-white float-left" onClick={ (e) => this.handleGoLeft(e) }><i className="fa fa-chevron-left"></i></button>
                                            <button type="button" className="btn btn-link" onClick={ (e) => this.handleGoDashboard(e) }><i className="fa fa-ellipsis-h"></i> </button>
                                            <button disabled={ nextDisable } type="button" className="btn btn-white float-right" onClick={ (e) => this.handleGoRight(e) }><i className="fa fa-chevron-right"></i> </button>
                                        </div>
                                    </div>
                                </div>
                
                            ) : ''}
          
                        </div>
                    </div>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(ShippingFinalPage)
