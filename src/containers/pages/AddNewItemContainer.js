import {connect} from 'react-redux'
import AddNewItemPage from 'components/pages/AddNewItemPage'
import {
    addEvent,
    addItem,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        userRole: state.user.userRole,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEvent: (fulfilmentOrderId, eventName) => {
            dispatch(addEvent(fulfilmentOrderId, eventName))
        },
        addItem: (fulfilmentOrderId, itemType, itemName, itemReference, itemDescription, itemPrice, itemQuantity) => {
            dispatch(addItem(fulfilmentOrderId, itemType, itemName, itemReference, itemDescription, itemPrice, itemQuantity))
        },
    }
}

const AddNewItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewItemPage)

export default AddNewItemContainer
