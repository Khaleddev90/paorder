import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import FormInput from '../elements/FormInput'
import FormSubmit from '../elements/FormSubmit'
import history from '../../history'
class ResetPasswordForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            emailSent : false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.success === 'sent') {
            this.setState({emailSent: true})
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleDoLogin = () => {
        
        this.props.resetPassword(this.state.email)
    }

    handlerBack = (e) => {
        history.push('/login')
    }

    render() {
        const {t} = this.props
        
        const disabled = (this.state.email.length > 0 ? false : true)
        return (

            <div className="LoginPage middle-box text-center loginscreen">
                <div>
                    <div>
                        <h1 className="logo-name">
                            PR
                        </h1>
                    </div>
                    {
                        this.state.emailSent 
                            ? <div>
                                <h3>
                                    
                                </h3>
                                <p>
                                    {t('order.reset_email_sent')}
                                </p>
                                <div className="LoginForm pt-5">
                                   
                                    Go back to <button type="button" className="btn btn-forgot" onClick={ (e) => this.handlerBack(e) }> {t('login.submit')}</button>
                                </div>
                            </div>
                            : <div>
                                <h3>
                                    {t('login.forgot_your_password')}
                                </h3>
                                <p>
                                    {t('login.forget_desc')}
                                </p>
                                <div className="LoginForm">
                                    
                                    <FormInput inputName="email" placeholderText={ t('default.email') } disabled={ this.state.loading }
                                        onChangeHandler={ this.handleInputChange } value={ this.state.email } autoFocus={ true }/>
                                    <FormSubmit disabled={ disabled } text={ t('default.reset_password') } block={ true } loading={ this.props.user.loading }
                                        onClickHandler={ this.handleDoLogin } />
                                    Go back to <button type="button" className="btn btn-forgot" onClick={ (e) => this.handlerBack(e) }> {t('login.submit')}</button>
                                </div>
                            </div>

                    }
                    
                </div>
            </div>
            
        )
    }
}

export default withNamespaces()(ResetPasswordForm)
