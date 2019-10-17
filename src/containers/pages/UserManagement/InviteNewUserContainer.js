import {connect} from 'react-redux'
import InviteNewUserPage from 'components/pages/UserManagement/InviteNewUserPage'
import {
    inviteNewUser,
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
        inviteNewUser: (email, manager) => {
            dispatch(inviteNewUser(email, manager))
        },
    }
}

const InviteNewUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InviteNewUserPage)

export default InviteNewUserContainer
