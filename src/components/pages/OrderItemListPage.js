import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import TopNavContainer from 'containers/elements/TopNavContainer'
import Loader from 'components/elements/Loader'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

class OrderItemListPage extends Component {
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
    }

    componentDidMount() {
        this.props.orderDetail(this.props.match.params.qrcode)
    }
    
    handleAddEvent = (e) => {
        this.props.addEvent(this.props.fulfilmentOrder.id, this.state.eventName)
    }

    handleAddItem =(e) => {
        history.push('/addnewitem/' + this.props.fulfilmentOrder.id)
    } 

    handleShowItem = (ItemId) => {
        history.push('/show-item/' + this.props.fulfilmentOrder.id + '/' + ItemId)
    }

    handleBack = (e) => {
        history.goBack()
    }

    handleDelete = (item) => {
        this.props.deleteItem(this.props.fulfilmentOrder, item.id)

        item.fulfilmentOrderBookings.map((bookItem) => (
            this.props.deleteBookItem(this.props.fulfilmentOrder, bookItem.id)
        ))
    }
    
    render() {
        const {t, fulfilmentOrder} = this.props

        let totalBookings = 0
        if (fulfilmentOrder && fulfilmentOrder.fulfilmentOrderItems) {
            for (let i = 0; i < fulfilmentOrder.fulfilmentOrderItems.length; i ++) {
                const item = fulfilmentOrder.fulfilmentOrderItems[i]
                
                for (let j = 0; j < item.fulfilmentOrderBookings.length; j ++) {
                    const booking = item.fulfilmentOrderBookings[j]
                    totalBookings += Number(booking.price) * Number(booking.quantity)
                }
            }
        }
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <Loader loading={ this.props.loading } />
                <div className="row">
                    <div className="col-lg-12" >
                        {
                            fulfilmentOrder && fulfilmentOrder.fulfilmentOrderItems && fulfilmentOrder.fulfilmentOrderItems.length > 0 
                                ? <div className="total-item"><h3>{t('order.total')}</h3>
                                    <div className="float-right">{totalBookings.toFixed(2)} &euro;</div>
                                </div>
                                : <h3 className="noitem">{t('order.no_items')}</h3>
                        }
                    </div>
                    <div className="col-lg-12">

                        {fulfilmentOrder ? (
                            
                            <div className="col-lg-12">
                                <table className="table table-hover table-mail" data-page-size="15">
                                    <tbody>
                                        {
                                            fulfilmentOrder.fulfilmentOrderItems ? (
                                                fulfilmentOrder.fulfilmentOrderItems.map((item, key) => (
                                    
                                                    <tr className='read' key={ item.id }>
                                            
                                                        <td>
                                                            <div className="text-warning"><strong>{item.name}</strong></div>
                                                            <small>{item.description}</small><br/>
                                                            <button type="button" className="btn btn-link float-left m-1" onClick={ (e) => this.handleDelete(item) }><i className="fa fa-trash-alt"></i></button>
                                                        </td>
                                                
                                                        <td>
                                                            {
                                                                item.fulfilmentOrderBookings && item.fulfilmentOrderBookings.length > 0 
                                                                    ? <div className="float-right">{item.fulfilmentOrderBookings[0].price} &#215; {item.fulfilmentOrderBookings[0].quantity}</div>
                                                                    : ''
                                                            }
                                                        </td>
                                                
                                                        <td>{
                                                            item.fulfilmentOrderBookings && item.fulfilmentOrderBookings.length > 0 
                                                                ? <div className="float-right">{ (Number(item.fulfilmentOrderBookings[0].price) * Number(item.fulfilmentOrderBookings[0].quantity)).toFixed(2) } 
                                                                    &euro;</div>
                                                                : ''
                                                        }
                                                        </td>

                                                    </tr>
                                                ))) : ''
                                        }
                                    
                                    </tbody>
                                </table>

                                <div className="footer fixed text-center d-flex" style={ {zIndex: '1002', alignItems: 'center'} }>
                                    <button type="button" className="btn btn-link float-left m-3" onClick={ (e) => this.handleBack(e) }><i className="fa fa-times fa-3x"></i></button>
                                    <button type="button" className="btn-item-add" onClick={ (e) => this.handleAddItem(e) }><i className="fa fa-plus"></i> {t('order.add_item')}</button>
                                    
                                </div>
                            </div>                
                        ) : ''}
            
                    </div>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(OrderItemListPage)
