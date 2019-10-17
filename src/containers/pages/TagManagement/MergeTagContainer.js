import { connect } from 'react-redux'
import MergeTagPage from 'components/pages/TagManagement/MergeTagPage'
import {
    getTags,
    deleteTagbyId,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        tagsData: state.order.tagsData,
        error: state.order.error,
        userRole: state.user.userRole,
        user: state.user,
        tags: state.order.tags,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTags: () => {
            dispatch(getTags())
        },
        deleteTagbyId: (currentTagId, mergeTagId) => {
            dispatch(deleteTagbyId(currentTagId, mergeTagId))
        },
    }
}

const MergeTagContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MergeTagPage)

export default MergeTagContainer
