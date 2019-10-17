import {connect} from 'react-redux'
import ConfirmResetPasswordForm from 'components/forms/ConfirmResetPasswordForm'
import {
    resetPasswordConfirm,
} from 'actions/userAction'

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPasswordConfirm: (userId, jwtToken, password) => {
            dispatch(resetPasswordConfirm(userId, jwtToken, password))
        },
    }
}

const ConfirmResetPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmResetPasswordForm)

export default ConfirmResetPasswordContainer
