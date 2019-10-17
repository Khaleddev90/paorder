import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../../history'
import Loader from 'components/elements/Loader'
import {Collapse} from 'react-collapse'
import Checkbox from 'components/elements/Checkbox'
import TopNavContainer from 'containers/elements/TopNavContainer'

class UserOverViewPage extends Component {
    state = {
        indexOfShow: -1,
        admin: false,
    }

    componentDidMount() {
        const {user} = this.props.location.state

        if (user.userRoles) {
            user.userRoles.map((roleItem, key) => (
                roleItem.manager ? this.setState({admin: true}) : this.setState({admin: false})
            ))
        }
    }

    handleClose = (e) => {
        history.goBack()    
    }

    handleNext = (e) => {
        history.goBack()
    }

    onCheckRole = (key) => {
        if (key === 'admin') {
            this.setState({admin: true})
        } else {
            this.setState({admin: false})
        }
    }

    handlerResetPassword = (e) => {
        const {user} = this.props.location.state
        this.props.resetPassword(user.email)
    }

    handlerChangePermission = (e) => {
        const {user} = this.props.location.state
        this.props.changePermission(user.userRoles[0].user_id, this.state.admin)
    }

    handlerDeactivate = (e) => {
        const {user} = this.props.location.state
        this.props.deactivateUser(user.userRoles[0].user_id, !user.isActive)
    }

    handlerNewLink = (e) => {
        const {user} = this.props.location.state
        this.props.newRegisterationLink(user.userRoles[0].user_id)
    }

    render() {
        const { t } = this.props
        const {user} = this.props.location.state
                
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
                        <div className="col-lg-12">
                            <div className="text-black"><strong>{user.displayName} ({user.isActive ? t('order.active') : t('order.inactive')}
                                {
                                    user.confirmEmailToken 
                                        ? user.isExpiredConfirmEmailToken
                                            ? `, ${t('order.confirmation_expired')}`
                                            : `, ${t('order.confirmation_pending')}` 
                                        : ''
                                })</strong></div>
                            <small>{user.email}</small><br/>
                            {
                                user.userRoles.map((roleItem, key) => (
                                    roleItem.manager ? <small key={ key }>{t('order.admin')}</small> : <small key={ key }>{t('order.clerk')}</small>
                                ))
                            }
                        </div>
                        <div className="col-lg-12" >
                            {
                                user.confirmEmailToken 
                                    ? process.env.NODE_ENV === 'production' 
                                        ? 'https://staging-fulfilment.liventy.net/confirm-email/' + user.confirmEmailToken
                                        : 'http://localhost:3005/confirm-email/' + user.confirmEmailToken
                                    :''
                            }
                        </div>

                        {
                            user.isExpiredConfirmEmailToken 
                                ? <div className="col-lg-12" >
                                    <button type="button" className="btn btn-white" onClick={ (e) => this.handlerNewLink(e) }> {t('order.new_registration_link')}</button>
                                </div>
                                : ''

                        }

                        <hr></hr>
                        <div className="col-lg-12">
                            <button type="button" className="btn bg-transparent" onClick={ (e) => this.setState({indexOfShow: 0}) }><i className="fa fa-key"></i> {t('order.reset_password')}</button>
                            <Collapse isOpened={ this.state.indexOfShow === 0 ? true: false }>
                                <div>{t('order.please_confirm')}</div>
                                <div className="btn-group d-flex justify-content-center mt-2">
                                    <button type="button" className="btn btn-white" onClick={ (e) => this.setState({indexOfShow: -1}) }> {t('common.cancel')}</button>
                                    <button type="button" className="btn btn-white" onClick={ (e) => this.handlerResetPassword(e) }> {t('common.confirm')}</button>
                                </div>
                            </Collapse>
                        </div>
                        <div className="col-lg-12">
                            <button type="button" className="btn bg-transparent" onClick={ (e) => this.setState({indexOfShow: 1}) }><i className="fa fa-graduation-cap"></i> {t('order.change_permission')}</button>
                            <Collapse isOpened={ this.state.indexOfShow === 1 ? true: false }>
                                <div className="mt-1">{t('order.please_select')}</div>
                                <div className="ml-3">
                                    <div className="d-flex align-items-center"><Checkbox onCheckItem={ this.onCheckRole } itemkey='clerk' checked={ !this.state.admin }/><label>{t('order.clerk')}</label></div>
                                    <div className="d-flex align-items-center"><Checkbox onCheckItem={ this.onCheckRole } itemkey='admin' checked={ this.state.admin }/><label>{t('order.admin')}</label></div>
                                </div>
                                <div className="btn-group d-flex justify-content-center mt-2">
                                    <button type="button" className="btn btn-white" onClick={ (e) => this.setState({indexOfShow: -1}) }> {t('common.cancel')}</button>
                                    <button type="button" className="btn btn-white" onClick={ (e) => this.handlerChangePermission(e) }> {t('common.confirm')}</button>
                                </div>
                            </Collapse>
                        </div>
                        <div className="col-lg-12">
                            <button type="button" className="btn bg-transparent" onClick={ (e) => this.setState({indexOfShow: 2}) }>
                                <i className="fa fa-ban"></i> { user.isActive ? t('order.deactivate_user') : t('order.reactivate_user')}
                            </button>
                            <Collapse isOpened={ this.state.indexOfShow === 2 ? true: false }>
                                <div>{t('order.set_user_status')}</div>
                                <div>{t('order.desc_when_reactivate')}</div>
                                <div className="btn-group d-flex justify-content-center mt-2">
                                    <button type="button" className="btn btn-white" onClick={ (e) => this.setState({indexOfShow: -1}) }> {t('common.cancel')}</button>
                                    <button type="button" className="btn btn-white" onClick={ (e) => this.handlerDeactivate(e) }> {user.isActive ? t('common.deactivate') : t('common.reactivate')}</button>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(UserOverViewPage)
