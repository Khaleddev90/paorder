import { connect } from 'react-redux'
import TagManagementPage from 'components/pages/TagManagement/TagManagementPage'
import {
    getTags,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        tagsData: state.order.tagsData,
        userRole: state.user.userRole,
        user: state.user,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTags: () => {
            dispatch(getTags())
        },
    }
}

const TagManagementContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagManagementPage)

export default TagManagementContainer
