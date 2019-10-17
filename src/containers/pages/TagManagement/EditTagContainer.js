import { connect } from 'react-redux'
import EditTagPage from 'components/pages/TagManagement/EditTagPage'
import {
    updateTagbyId,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        tagsData: state.order.tagsData,
        error: state.order.error,
        userRole: state.user.userRole,
        user: state.user,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTagbyId: (tagId, tagName) => {
            dispatch(updateTagbyId(tagId, tagName))
        },
    }
}

const EditTagContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTagPage)

export default EditTagContainer
