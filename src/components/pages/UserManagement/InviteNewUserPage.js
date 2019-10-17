import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../../history'
import Loader from 'components/elements/Loader'
import Checkbox from 'components/elements/Checkbox'
import TopNavContainer from 'containers/elements/TopNavContainer'

class UserManagementPage extends Component {
    state = {
        email: '',
        admin: false,
    }

    handleClose = (e) => {
        history.goBack()    
    }

    handleInvite = (e) => {
        if (this.state.email !== '') {
            this.props.inviteNewUser(this.state.email, this.state.admin)
        }
    }

    onCheckRole = (key) => {
        if (key === 'admin') {
            this.setState({admin: true})
        } else {
            this.setState({admin: false})
        }
    }
    
    render() {
        const { t } = this.props

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />
                    
                    <div className="col-lg-12">
                        <div className="header fixed text-center d-flex">
                            <div className="col-lg-12">
                                <h2>{t('order.invite_new_user')}</h2>
                            </div>
                            <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>
                        </div>
                        <div className="col-lg-12">
                            <h2>{t('order.enter_email_address')}</h2>
                        </div>

                        <div className="col-lg-12">
                            <input type="text" placeholder={ t('order.e_mail') } className="form-control" value={ this.state.email } 
                                onChange={ (e) => this.setState({email: e.target.value, error: null}) }
                            />
                            {  
                                this.state.error 
                                    ? <div className="col-lg-12 text-danger">
                                        {t('error.already_use_email')}
                                    </div>
                                    : ''
                            }
                        </div>

                        <div className="bottom-item">
                            <div className="row">
                                <div className="col-lg-12">
                                    {t('order.invite_desc')}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <h2>{t('order.select_roles')}</h2>
                            <div className="ml-3">
                                <div className="d-flex align-items-center"><Checkbox onCheckItem={ this.onCheckRole } itemkey='clerk' checked={ !this.state.admin }/><label>{t('order.clerk')}</label></div>
                                <div className="d-flex align-items-center"><Checkbox onCheckItem={ this.onCheckRole } itemkey='admin' checked={ this.state.admin }/><label>{t('order.admin')}</label></div>
                            </div>
                        </div>

                        <div className="footer fixed text-center d-flex" style={ {zIndex: '1002'} }>
                            <button type="button" className="btn-item-add" onClick={ (e) => this.handleInvite(e) }>{t('order.create_user')}</button>
                        </div>
                    </div>

                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(UserManagementPage)
