import {connect} from 'react-redux'
import LoginForm from 'components/forms/LoginForm'
import {authorizeAction, initLogin} from '../../actions/authAction'

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authorize: (email, password, from) => {
            
            dispatch(authorizeAction(email, password, from))
        },
        initLogin:() => {
            dispatch(initLogin())
        },
    }
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)

export default LoginFormContainer
