import { connect } from 'react-redux'
import AddTagPage from 'components/pages/AddTagPage'
import {
    addTag,
    getTags,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        tagsData: state.order.tagsData,
        userRole: state.user.userRole,
        user: state.user,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTag: (fulfilmentOrderId, name) => {
            dispatch(addTag(fulfilmentOrderId, name))
        },
        getTags: () => {
            dispatch(getTags())
        },
    }
}

const AddTagContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTagPage)

export default AddTagContainer
