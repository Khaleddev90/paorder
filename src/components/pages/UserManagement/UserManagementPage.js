import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class UserManagementPage extends Component {

    componentDidMount () {
        this.props.getUserList()
    }

    handleClose = (e) => {
        history.push('/')
    }

    handleNext = (e) => {
        history.push('/invite-new-user')
    }

    handleUserOverview = (key) => {
        history.push({
            pathname: '/user-overview',
            state: { user: this.props.users[key] },
        })
    }

    render() {
        const {t, users} = this.props

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />
                    
                    <div className="col-lg-12">
                        <div className="header fixed text-center d-flex">
                            <div className="col-lg-12">
                                <h2>{t('order.user_management')}</h2>
                                
                            </div>
                            <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>
                        </div>

                        <table className="table table-hover table-mail" data-page-size="15">
                            <tbody>
                                {
                                    users ? (
                                        users.map((item, key) => (

                                            <tr className='read' key={ key } onClick={ (e) => this.handleUserOverview(key) }>
                                                <td>
                                                    <div className="text-black"><strong>{item.displayName} ({item.isActive ? t('order.active') : t('order.inactive')} 
                                                        {
                                                            item.confirmEmailToken 
                                                                ? item.isExpiredConfirmEmailToken
                                                                    ? `, ${t('order.confirmation_expired')}`
                                                                    : `, ${t('order.confirmation_pending')}` 
                                                                : ''
                                                        })</strong></div>
                                                        
                                                    <small>{item.email}</small><br/>
                                                    {
                                                        // eslint-disable-next-line no-shadow
                                                        item.userRoles.map((roleItem, key) => (
                                                            // eslint-disable-next-line react/no-array-index-key
                                                            roleItem.manager ? <small key={ key }>{t('order.admin')}</small> : <small key={ key }>{t('order.clerk')}</small>
                                                        ))
                                                    }
                                                </td>
                                            </tr>
                                        ))) : <tr></tr>
                                }
                            
                            </tbody>
                        </table>
                        <div className="footer fixed text-center d-flex" style={ {zIndex: '1002'} }>
                            <button type="button" className="btn-item-add" onClick={ (e) => this.handleNext(e) }>{t('order.new_user')}</button>
                        </div>
                    </div>
                </div>

            </div></div></div></div>
        )
    }
}

export default withNamespaces()(UserManagementPage)
