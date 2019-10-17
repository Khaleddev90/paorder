import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import FormInput from '../elements/FormInput'
import FormSubmit from '../elements/FormSubmit'
import Alert from '../elements/Alert'
import history from '../../history'
class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }

    }

    componentDidMount() {
        this.props.initLogin()
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.handleDoLogin()
        }
    }

    handleDoLogin = () => {
        if (this.state.email === '' || this.state.password === '')
            return
        const { from } = this.props.location.state || { from: { pathname: '/' } }        
        this.props.authorize(this.state.email, this.state.password, from)
    }

    handerForgotPassword = (e) => {
        history.push('/reset-password/no')
    }

    render() {
        const {t} = this.props

        let disabled = (this.state.password.length >= 64 ? true : false)
        if (this.state.password === '') {
            disabled = true
        }

        if (this.state.email === '') {
            disabled = true
        }
        
        return (

            <div className='LoginPage middle-box text-center loginscreen'>
                <div>
                    <div>
                        <h1 className='logo-name'>
                            PR
                        </h1>
                    </div>
                    <h3>
                        {t('app.title')}
                    </h3>
                    <p>
                        {t('login.title')}
                    </p>
                    <div className='LoginForm'>
                        
                        <FormInput inputName='email' placeholderText={ t('default.email') } disabled={ this.state.loading }
                            onChangeHandler={ this.handleInputChange } value={ this.state.email } autoFocus={ true }/>
                        <FormInput inputName='password' inputType='password' placeholderText={ t('default.password') }
                            onChangeHandler={ this.handleInputChange } value={ this.state.password }
                            onKeyPress={ this.handleKeyPress }
                            disabled={ this.state.loading }/>
                        {this.props.user.error ? (
                            <Alert level='danger' text={ t('login.authenticationError') }/>
                        ) : null}
                        <button type='button' className='btn btn-forgot' onClick={ (e) => this.handerForgotPassword(e) }> {t('default.password_forgotten')}</button>
                        <FormSubmit disabled={ disabled } text={ t('login.submit') } block={ true } loading={ this.props.user.loading }
                            onClickHandler={ this.handleDoLogin } icon='sign-in'/>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withNamespaces()(LoginForm)
