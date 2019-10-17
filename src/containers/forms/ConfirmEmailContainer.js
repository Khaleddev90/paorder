import {connect} from 'react-redux'
import ConfirmEmailForm from 'components/forms/ConfirmEmailForm'
import {
    confirmEmail,
} from 'actions/authAction'

const mapStateToProps = state => {
    return {
        user: state.user,
        loading: state.user.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        confirmEmail: (token, email, displayName) => {
            dispatch(confirmEmail(token, email, displayName))
        },
    }
}

const ConfirmEmailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmEmailForm)

export default ConfirmEmailContainer
