import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'
import vshape from 'theme/inspinia/img/vshape.png'
import TimeAgo from 'react-timeago'
import { getLocalFormatter } from 'utils/converting'

class QueryDetailPage extends Component {
    state = {
        orderItem: null,
        answers:[],
    }

    componentDidMount() {
        this.props.orderDetail(this.props.match.params.qrcode)
    }
    
    handleClose = (e) => {
        history.goBack()
    }

    handleAddQuery = (e) => {
        history.push('/query-new/' + this.props.match.params.qrcode)
    }

    handleOrderDetail = (e) => {
        history.push('/order-detail/' + this.props.match.params.qrcode)
    }

    handlerChangeAnswer = (e, key) => {
        e.preventDefault()
        const tmp = e.target.value

        const answers = this.state.answers
        answers[key] = tmp

        this.setState({
            answers: answers,
        })
    }

    handlerSendAnswer = (e, key) => {
        this.props.addAnswer(this.props.fulfilmentOrder.fulfilmentOrderDialogQuestions[key].id, 
            this.state.answers[key], this.props.match.params.qrcode)
    }
    render() {
        const { t, fulfilmentOrder } = this.props
        const formatter = getLocalFormatter()
        return (
            <div id='wrapper'><div id='page-wrapper'><TopNavContainer/><div className='wrapper wrapper-content'><div className='container'>
                <div className='row'>
                    <Loader loading={ this.props.loading } />
                    
                    {fulfilmentOrder ? <div className='col-lg-12'>
                        <div className='header-center-list fixed text-center'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <h3>{fulfilmentOrder.externalReference}</h3>
                                </div>
                                <div className='col-lg-12' onClick={ (e) => this.handleClose(e) }>
                                    <div className='btn btn-outline'>
                                        {t('order.show_order_detail')}
                                    </div>
                                </div>

                                <div className='col-lg-12' style={ {marginTop: '-10px'} } onClick={ (e) => this.handleClose(e) }>
                                    <img src={ vshape } style={ {height: '10px'} } alt=''></img><br/>
                                </div>
                            </div>
                        </div>
                        {
                            fulfilmentOrder.fulfilmentOrderDialogQuestions.length > 0 
                                ? <table className='table table-mail' data-page-size='15'>
                                    <tbody>
                                        {
                                        
                                            fulfilmentOrder.fulfilmentOrderDialogQuestions.map((item, key) => (
                                    
                                                <tr className='read' key={ item.id }>
                                                    <td>
                                                        {
                                                            item.createdBy.userRoles[0].fulfilment_partner_id !== this.props.user.userRole.fulfilmentPartnerId ||
                                                            item.createdBy.userRoles[0].supplier_id !== this.props.user.userRole.supplierId 
                                                                ? <div className='incoming_msg'>
                                                                    <div className='text-black d-flex justify-content-between'>
                                                                        <small>{item.createdBy.displayName}</small>
                                                                        <small><TimeAgo date={ new Date(item.created_at) } formatter={ formatter } /></small>
                                                                    </div>
                                                                    <div className='received_msg'>
                                                                        <div className='received_withd_msg'>
                                                                            <p>{item.value}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                : <div className='outgoing_msg'>
                                                                    <div className='text-black d-flex justify-content-between'>
                                                                        <small>{item.createdBy.displayName}</small>
                                                                        <small><TimeAgo date={ new Date(item.created_at) } formatter={ formatter } /></small>
                                                                    </div>
                                                                    <div className='sent_msg'>
                                                                        <p>{item.value}</p>
                                                                    </div>
                                                                </div> 
                                                        }
                                                    
                                                        {
                                                            item.fulfilmentOrderDialogAnswer
                                                                ? item.fulfilmentOrderDialogAnswer.createdBy.userRoles[0].fulfilment_partner_id !== this.props.user.userRole.fulfilmentPartnerId ||
                                                                item.fulfilmentOrderDialogAnswer.createdBy.userRoles[0].supplier_id !== this.props.user.userRole.supplierId 
                                                                    ? <div className='incoming_msg'>
                                                                        <div className='text-black d-flex justify-content-between'>
                                                                            <small>{item.fulfilmentOrderDialogAnswer.createdBy.displayName}</small>
                                                                            <small><TimeAgo date={ new Date(item.fulfilmentOrderDialogAnswer.created_at) } formatter={ formatter } /></small>
                                                                        </div>
                                                                        <div className='received_msg'>
                                                                            <div className='received_withd_msg'>
                                                                                <p>{item.fulfilmentOrderDialogAnswer.value}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    : <div className='outgoing_msg'>
                                                                        <div className='text-black d-flex justify-content-between'>
                                                                            <small>{item.fulfilmentOrderDialogAnswer.createdBy.displayName}</small>
                                                                            <small><TimeAgo date={ new Date(item.fulfilmentOrderDialogAnswer.created_at) } formatter={ formatter } /></small>
                                                                        </div>
                                                                        <div className='sent_msg'>
                                                                            <p>{item.fulfilmentOrderDialogAnswer.value}</p>
                                                                        </div>
                                                                    </div>
                                                                : fulfilmentOrder.fulfilmentOrderState.key !== 'CLOSED'
                                                                    ? item.createdBy.userRoles[0].fulfilment_partner_id !== this.props.user.userRole.fulfilmentPartnerId ||
                                                                    item.createdBy.userRoles[0].supplier_id !== this.props.user.userRole.supplierId 
                                                                        ? <div className='type_msg'>
                                                                            <div className='input_msg_write'>
                                                                                <input type='text' className='write_msg' placeholder={ t('order.write_answer') } 
                                                                                    value={ this.state.answers[key] } onChange={ (e) => this.handlerChangeAnswer(e, key) }/>
                                                                                <button className='msg_send_btn' type='button' onClick={ (e) => this.handlerSendAnswer(e, key) }>
                                                                                    <i className='fa fa-paper-plane' aria-hidden='true'></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        : <div className='type_msg'>
                                                                            <div className='input_msg_write'>
                                                                                <p>{t('order.waiting_answer')}</p>
                                                                            </div>
                                                                        </div>
                                                                    :''
                                                        }
                                                    
                                                    </td>
                                                    
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                : <div className='text-center mt-5'>{t('order.no_query_yet')}</div>
                        }
                        
                        { 
                            fulfilmentOrder.fulfilmentOrderState.key !== 'CLOSED' 
                                ? <div className='footer fixed text-center d-flex' style={ {zIndex: '1002'} }>
                                    <button type='button' className='btn-item-add' onClick={ (e) => this.handleAddQuery(e) }>{t('order.add_query')}</button>
                                </div>
                                : ''
                        }
                        
                    </div>
                        : ''
                    }
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(QueryDetailPage)
