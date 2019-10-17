import {connect} from 'react-redux'
import UserManagementPage from 'components/pages/UserManagement/UserManagementPage'
import {
    getUserList,
} from 'actions/userAction'

const mapStateToProps = (state) => {
    return {
        users: state.partnerUser.users,
        loading: state.partnerUser.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserList: () => {
            dispatch(getUserList())
        },
    }
}

const UserManagementContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagementPage)

export default UserManagementContainer
