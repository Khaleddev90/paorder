import {connect} from 'react-redux'
import ResetPasswordForm from 'components/forms/ResetPasswordForm'
import {
    resetPassword,
} from 'actions/userAction'

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPassword: (email) => {
            dispatch(resetPassword(email))
        },
    }
}

const ResetPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordForm)

export default ResetPasswordContainer
