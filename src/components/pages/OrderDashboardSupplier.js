import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import moment from 'moment'
import history from '../../history'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class OrderDashboardSupplier extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: 'onlyOpenQuestions',
        }
    }
    componentDidMount() {
        this.props.supplierLoad(this.state.type)
    }

    componentWillReceiveProps(nextProps) {
        if (localStorage.getItem('currentLanguage') && localStorage.getItem('currentLanguage') === 'DE') {
            moment.locale('de')
        } else {
            moment.locale('en')
        }
    }
    
    handleOrderDetail = (e) => {
        history.push('/order-detail/' + e.qrcode)
    }
    
    handleCreateOrder = (e) => {
        history.push('/create-order')
    }

    changeTypeHandler = (type) => {
        this.setState({type: type}, this.props.supplierLoad(type))
    }

    render() {
        const { t, fulfilmentOrders } = this.props

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>{t('order.open_orders')}</h5>
                            
                            </div>
                            <div className="ibox-content">
                                <Loader loading={ this.props.loading } />
                                {fulfilmentOrders ? (
                                    <div className="table-responsive">
                                        <div className="btn-group">
                                            <button onClick={ (e) => this.changeTypeHandler('') } className={ this.state.type === '' ? 'btn btn-primary' : 'btn btn-white' } type="button">{t('common.all')}</button>
                                            <button onClick={ (e) => this.changeTypeHandler('onlyUnreadQuestions') } 
                                                className={ this.state.type === 'onlyUnreadQuestions' ? 'btn btn-primary' : 'btn btn-white' } type="button">Unread Question</button>
                                            <button onClick={ (e) => this.changeTypeHandler('onlyUnreadAnswers') } 
                                                className={ this.state.type === 'onlyUnreadAnswers' ? 'btn btn-primary' : 'btn btn-white' } type="button">Unread Answer</button>
                                            <button onClick={ (e) => this.changeTypeHandler('onlyOpenQuestions') } 
                                                className={ this.state.type === 'onlyOpenQuestions' ? 'btn btn-primary' : 'btn btn-white' } type="button">Open Question</button>
                                        </div>
                                        <div className='btn btn-primary float-right' onClick={ (e) => this.handleCreateOrder(e) } >Create Order</div>
                        
                                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4">
                                            <table className="table table-hover " id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid">
                                                <tbody>
                                                    {
                                                        fulfilmentOrders.map((item, key) => (
                                                            <tr className="gradeA odd" key={ key } role="row" onClick={ () => this.handleOrderDetail(item) }>
                                                                <td className="sorting_1">
                                                                    <img alt="" className="rounded-circle" style={ {width: '30px'} } src="http://webapplayers.com/inspinia_admin-v2.8/img/a4.jpg"></img>
                                                                </td>
                                                                <td>
                                                                    <div><strong>{item.externalReference}</strong></div>
                                                                    <small>{item.deviceSupplier + ' ' + item.deviceLabel}</small><br/>
                                                                    <small>{item.deviceSerialnumber}</small>                                                    
                                                                </td>
                                                                <td>{moment(item.created).format('DD.MM.YYY')}</td>
                                                    
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                        
                                            </table>
                                
                                        </div>

                                    </div>
                                ) : t('order.not_found')}
            
                            </div>    
                        </div>
                    </div>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(OrderDashboardSupplier)
