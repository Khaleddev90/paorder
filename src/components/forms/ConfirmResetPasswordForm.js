import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import FormInput from '../elements/FormInput'
import FormSubmit from '../elements/FormSubmit'
import Alert from '../elements/Alert'
class ConfirmResetPasswordForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmPassword: '',
        }
    }
    
    handlerConfirm = (e) => {
        this.props.resetPasswordConfirm(this.props.match.params.userId, this.props.match.params.jwtToken, this.state.password)
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const {t} = this.props
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')

        let showCheckPassword = strongRegex.test(this.state.password) ? 1 : 2
        showCheckPassword = this.state.password.length === 0 ? 0 : showCheckPassword
        let showCheckConfirmPassword = this.state.password === this.state.confirmPassword ? 1 : 2
        showCheckConfirmPassword = this.state.confirmPassword === '' ? 0 : showCheckConfirmPassword

        const disabled = showCheckPassword === 1 && showCheckConfirmPassword === 1 ? false: true
        return (

            <div className="LoginPage middle-box text-center loginscreen">
                <div>
                    <div>
                        <h1 className="logo-name">
                            PR
                        </h1>
                    </div>
                    <h3>
                        {t('login.welcome')} <strong>{t('app.title')}</strong>
                    </h3>
                    <p>
                        {t('login.resetpassword_desc1')}<br/>
                        {t('login.resetpassword_desc2')}<br/>
                        {t('login.resetpassword_desc3')}
                    </p>
                    <div className="LoginForm">
                        
                        <FormInput showCheck={ showCheckPassword } inputName="password" inputType="password" placeholderText={ t('default.password') }
                            onChangeHandler={ this.handleInputChange } value={ this.state.password }
                            disabled={ this.props.loading }/>
                        
                        <FormInput showCheck={ showCheckConfirmPassword } inputName="confirmPassword" inputType="password" placeholderText={ t('default.confirm_password') }
                            onChangeHandler={ this.handleInputChange } value={ this.state.confirmPassword }
                            disabled={ this.props.loading }/>
                        {this.props.user.error ? (
                            <Alert level="danger" text={ t('login.resetPasswordError') }/>
                        ) : null}
                        <FormSubmit disabled={ disabled } text={ t('login.set_password') } block={ true } loading={ this.props.loading }
                            onClickHandler={ this.handlerConfirm } />
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default withNamespaces()(ConfirmResetPasswordForm)
