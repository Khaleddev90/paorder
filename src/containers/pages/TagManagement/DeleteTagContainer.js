import { connect } from 'react-redux'
import DeleteTagPage from 'components/pages/TagManagement/DeleteTagPage'
import {
    deleteTagbyId,
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
        deleteTagbyId: (tagId) => {
            dispatch(deleteTagbyId(tagId))
        },
    }
}

const DeleteTagContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteTagPage)

export default DeleteTagContainer
