import {connect} from 'react-redux'
import UserOverViewPage from 'components/pages/UserManagement/UserOverViewPage'
import {
    resetPassword,
    changePermission,
    deactivateUser,
    newRegisterationLink,
} from 'actions/userAction'

const mapStateToProps = (state) => {
    return {
        users: state.partnerUser.users,
        loading: state.partnerUser.loading,
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPassword: (email) => {
            dispatch(resetPassword(email))
        },
        changePermission: (userId, admin) => {
            dispatch(changePermission(userId, admin))
        },
        deactivateUser: (userId, activate) => {
            dispatch(deactivateUser(userId, activate))
        },
        newRegisterationLink: (userId) => {
            dispatch(newRegisterationLink(userId))
        },
    }
}

const UserOverViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserOverViewPage)

export default UserOverViewContainer
