import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Loader from 'components/elements/Loader'
import TextareaAutosize from 'react-autosize-textarea'
import TopNavContainer from 'containers/elements/TopNavContainer'

class QueryNewPage extends Component {
    state = {
        orderItem: null,
        query: '',
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

    handleAddQuery = (e) => {
        history.push('/invite-new-user')
    }

    handlerSend = (e) => {
        if (this.state.query !== '')
            this.props.addQuestion(this.state.orderItem.id, this.state.query)
    }

    handleOrderDetail = (e) => {
        history.push('/order-detail/' + this.props.match.params.qrcode)
    }

    render() {
        const {t} = this.props
        const { orderItem } = this.state
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />
                
                    {
                        orderItem 
                            ? <div className="col-lg-12">
                                <div className="header-three fixed text-center">
                        
                                    <div className='btn btn-outline float-left' onClick={ (e) => this.handleOrderDetail(e) }>
                                        <i className="fa fa-wrench fa-3x"></i>
                                    </div>
                                    <h2>{orderItem.externalReference}</h2>
                                    <div className='btn btn-outline float-right' onClick={ (e) => this.handleClose(e) }>
                                        <i className="fa fa-chevron-left fa-3x"></i>
                                    </div>                        
                                </div>

                                <div className="mt-1 text-center" >
                                    <h2>{t('order.write_query')}</h2>
                                </div>

                                <div className="mt-1" >
                                    <TextareaAutosize
                                        style={ { minHeight: 100, boxSizing: 'border-box', resize: 'auto', width: '100%' } }
                                        value={ this.state.query }
                                        placeholder={ t('order.query_text') }
                                        onChange={ (e) => this.setState({query: e.target.value}) }
                                    />
                                </div>

                                <div className="mt-1" >
                                    <button type="button" className="btn btn-outline-info float-right" onClick={ (e) => this.handlerSend(e) }><i className="fa fa-paper-plane fa-3x"></i> </button>
                                </div>

                            </div>
                            : <div></div>
                    }
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(QueryNewPage)
