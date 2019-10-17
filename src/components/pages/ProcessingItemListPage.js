import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import TopNavContainer from 'containers/elements/TopNavContainer'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Checkbox from 'components/elements/Checkbox'
class ProcessingItemListPage extends Component {
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
        selectedItem: [],
    }

    componentWillReceiveProps(nextProps) {
        
        const orderItem = nextProps.fulfilmentOrders.find((el) =>
            el.qrcode === this.props.match.params.qrcode
        )

        this.setState({orderItem: orderItem})
    }
    
    handleAddEvent = (e) => {
        this.props.addEvent(this.state.orderItem.id, this.state.eventName)
    }

    handleFinishProcessing =(e) => {
        localStorage.setItem('workingitem', this.state.orderItem.id)
        this.props.addEvent(this.state.orderItem.id, 'FULFILLED_COMPLETED', this.props.match.params.qrcode)
    } 

    handleShowItem = (ItemId) => {
        history.push('/show-item/' + this.state.orderItem.id + '/' + ItemId)
    }

    handleBack = (e) => {
        history.goBack()
    }

    onCheckItem = (key) => {
        const selected = this.state.orderItem.fulfilmentOrderItems[key]
        let selectedItem = this.state.selectedItem.filter(checkedItem => checkedItem === selected)

        if (selectedItem.length !== 0) {
            selectedItem = this.state.selectedItem.filter(checkedItem => checkedItem !== selected)
            this.setState({selectedItem: selectedItem})
        } else {
            this.setState(prevState => {
                const prelist = prevState.selectedItem
                prelist.push(selected)
                return {
                    selectedItem: prelist,
                }
            })
        }        
    }
    
    render() {
        const {t} = this.props
        const { orderItem } = this.state

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <div className="col-lg-12 d-flex" style={ {justifyContent: 'space-between'} }>
                        <h3>{t('order.completed_tasks')}</h3>
                    </div>
                    <div className="col-lg-12">
                    
                        {orderItem ? (
                        
                            <div className="col-lg-12">
                                <table className="table table-hover" data-page-size="15">
                                    <tbody>
                                        {
                                            orderItem.fulfilmentOrderItems ? (
                                                orderItem.fulfilmentOrderItems.map((item, key) => (
                                
                                                    <tr className='read' key={ key } >
                                                        <td>
                                                            <div className="text-warning"><h3>{item.name}</h3></div>
                                                            <h4>{item.description}</h4><br/>
                                                        </td>
                                                        <td>
                                                            {
                                                                item.fulfilmentOrderBookings && item.fulfilmentOrderBookings.length > 0 
                                                                    ? <div className="float-right">&euro;{Number(item.fulfilmentOrderBookings[0].price).toFixed(2)} &#215; {item.fulfilmentOrderBookings[0].quantity}</div>
                                                                    : ''
                                                            }
                                                        </td>
                                                        <td>{
                                                            <div className="float-right">
                                                                <Checkbox onCheckItem={ this.onCheckItem } itemkey={ key } checked={ this.state.selectedItem.find(checkedItem => checkedItem === item) ?true : false }/>
                                                            </div>
                                                        }
                                                        </td>
                                                    </tr>
                                                ))) : ''
                                        }
                                
                                    </tbody>
                                </table>

                                <div className="footer fixed text-center d-flex" style={ {zIndex: '1002', alignItems: 'center'} }>
                                    <button type="button" className="btn btn-link float-left m-3" onClick={ (e) => this.handleBack(e) }><i className="fa fa-times fa-3x"></i></button>
                                    <button type="button" className="btn-item-finish" disabled={ this.state.selectedItem.length > 0 ? false: true } 
                                        onClick={ (e) => this.handleFinishProcessing(e) }>{t('order.finish_processing')}</button>
                                </div>
                            </div>                
                        ) : ''}
                    </div>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(ProcessingItemListPage)
