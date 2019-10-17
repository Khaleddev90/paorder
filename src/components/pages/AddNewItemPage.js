import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NewItem from 'components/elements/NewItem'
import Option from 'components/elements/Option'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class AddNewItemPage extends Component {
    state = {
        orderItem: null,
        newItem: {
            itemType: '',
            itemReference: '',
            itemDescription: '',
            itemName: '',
            itemPrice: -1,
            itemQuantity: 0,
        },
        itemReference: '',
        itemDescription: '',
        itemName: '',
        itemPrice: '100',
        itemQuantity: 1,
        currentStep: 0, // 0 item type, 1 
        switched: false,
        error: null,
    }

    componentDidMount() {
        if (!this.props.fulfilmentOrders) {
            history.push('/')
            return
        }
        const orderItem = this.props.fulfilmentOrders.find((el) =>
            el.id === Number(this.props.match.params.fulfilmentId)
        )
        this.setState({orderItem: orderItem})
    }
    
    toggleSwitch = () => {
        
        this.setState(prevState => {
            return {
                switched: !prevState.switched,
            }
        })
    }

    handleAddEvent = (e) => {
        this.props.addEvent(this.state.orderItem.id, this.state.eventName)
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
        this.setState(prevState => {
            const oldStep = prevState.currentStep
            const oldItem = prevState.newItem
            if (oldStep >= 1) {

                if (oldStep === 1) {
                    oldItem.itemType = ''
                } else if (oldStep === 2) {
                    oldItem.itemName = ''
                } else if (oldStep === 3) {
                    oldItem.itemDescription = ''
                } else if (oldStep === 4) {
                    oldItem.itemPrice = -1
                } else if (oldStep === 5) {
                    oldItem.itemQuantity = 0
                }
                return {
                    currentStep: oldStep - 1,
                    newItem: oldItem,
                }
            }
        })
    }

    handleNext = (e) => {
        const {t} = this.props
        if (this.state.currentStep === 4) {//call api

            if (Number(this.state.itemQuantity) <= 0) {
                this.setState({error: t('error.valid_quantity')})
                return
            }
            this.setState({error: null})

            const item = {
                fulfilmentOrderId: this.state.orderItem.id, 
                itemType: this.state.newItem.itemType,
                itemName: this.state.newItem.itemName,
                itemReference: this.state.orderItem.externalReference,
                itemDescription: this.state.newItem.itemDescription,
                itemPrice: this.state.newItem.itemPrice,
                itemQuantity: Number(this.state.itemQuantity),
                qrcode: this.state.orderItem.qrcode,
            }
            this.props.addItem(item)

            if (this.state.orderItem.fulfilmentOrderState.key !== 'ASSESSMENT') {
                this.props.addEvent(this.state.orderItem.id, 'ASSESSMENT')
            }
            return
        } else if (this.state.currentStep === 0) {
            this.setState(prevState => {
                const newItem = prevState.newItem
                newItem.itemType = this.state.switched ? 'material' : 'workinghours'
                return {
                    newItem: newItem,
                }
            })
        } else if (this.state.currentStep === 1) {

            if (this.state.itemName === '') {
                this.setState({error: t('error.valid_name')})
                return
            }
            this.setState(prevState => {
                const newItem = prevState.newItem
                newItem.itemName = this.state.itemName
                return {
                    newItem: newItem,
                }
            })
        } else if (this.state.currentStep === 2) {
            
            if (this.state.itemDescription === '') {
                this.setState({error: t('error.valid_desc')})
                return
            }
            this.setState(prevState => {
                const newItem = prevState.newItem
                newItem.itemDescription = this.state.itemDescription
                return {
                    newItem: newItem,
                }
            })
        } else if (this.state.currentStep === 3) {

            const numberOfFloat = this.state.itemPrice.length - this.state.itemPrice.indexOf('.') - 1

            if (Number(this.state.itemPrice) < 0 || (numberOfFloat > 2 && numberOfFloat !== this.state.itemPrice.length)) {
                this.setState({error: t('error.valid_price')})
                return
            }
            this.setState(prevState => {
                const newItem = prevState.newItem
                newItem.itemPrice = Number(this.state.itemPrice)
                return {
                    newItem: newItem,
                }
            })
        }
        
        this.setState(prevState => {
            const oldStep = prevState.currentStep
            return {
                currentStep: oldStep + 1,
                error: null,
            }
        })
    }

    handleChangePrice = (e) => {

        if (Number(e.target.value) >= 0) {
            this.setState({itemPrice: e.target.value, error: null})
        }
    }

    handleChangeQuantity = (e) => {
        if (Number(e.target.value) >= 0) {
            this.setState({itemQuantity: e.target.value, error: null})
        }
    }
    handleChangeType = () => {
        this.setState(prevState => {
            return { switched: !prevState.switched}
        })
    }
    render() {
        const {t} = this.props
        const { orderItem } = this.state

        let InputItem = ''

        if (this.state.currentStep === 0) {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.choose_type')}</h2>
                    </div>
                    
                    <div className="col-12">
                        <Option onCheckItem={ this.handleChangeType } checked={ this.state.switched } label={ t('order.material') }/>
                    </div>
                    <hr></hr>
                    <div className="col-12">
                        <Option onCheckItem={ this.handleChangeType } checked={ !this.state.switched } label={ t('order.working_hours') }/>
                    </div>
                
                </div>
            </div>
        } else if (this.state.currentStep === 1) {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_name')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="text" placeholder="Item name" className="form-control" value={ this.state.itemName } 
                            onChange={ (e) => this.setState({itemName: e.target.value, error: null}) }
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
                        {t('order.desc_name')}
                    </div>
                </div>
            </div>
        } else if (this.state.currentStep === 2) {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_desc')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <textarea type="text" placeholder="Item name" className="form-control" value={ this.state.itemDescription } 
                            onChange={ (e) => this.setState({itemDescription: e.target.value, error: null}) }
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
                        {t('order.information')}
                    </div>
                </div>
            </div>
        } else if (this.state.currentStep === 3) {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_price')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="number" placeholder="0.00" className="form-control" value={ this.state.itemPrice } 
                            onChange={ (e) => this.handleChangePrice(e) }
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
                        {t('order.price_desc')}
                    </div>
                </div>
            </div>
        } else if (this.state.currentStep === 4) {
            InputItem = <div className="input-item-div">
                <div className="row">
                    <div className="col-lg-12 mb-2">
                        <h2>{t('order.enter_quantity')}</h2>
                    </div>
                    <div className="col-lg-12">
                        <input type="number" placeholder="Quantity" className="form-control" value={ this.state.itemQuantity } 
                            onChange={ (e) => this.handleChangeQuantity(e) }
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
                        {t('order.quantity_desc')}
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
                            <NewItem item={ this.state.newItem } handleClose={ this.handleClose }/>

                            {InputItem}
                            <div className="footer fixed text-center d-flex" style={ {zIndex: '1002', height: '106px'} }>
                                {
                                    this.state.currentStep !== 0
                                        ? <button type="button" className="btn btn-link float-left m-3" onClick={ (e) => this.handleBack(e) }><i className="fa fa-chevron-left fa-3x"></i></button>
                                        : ''
                                }
                                {
                                    this.state.currentStep === 4 
                                        ? <button type="button" className="btn-item-add" onClick={ (e) => this.handleNext(e) }>+ {t('common.add')}</button>
                                        : <button type="button" className="btn-item-add" onClick={ (e) => this.handleNext(e) }>{t('common.next')}</button>
                                }
                            </div>
                        </div>            
                    ) : ''}
            
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(AddNewItemPage)
