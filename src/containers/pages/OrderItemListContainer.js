import {connect} from 'react-redux'
import OrderItemListPage from 'components/pages/OrderItemListPage'
import {
    orderDetail,
    addEvent,
    deleteItem,
    deleteBookItem,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        fulfilmentOrder: state.order.fulfilmentOrder,
        userRole: state.user.userRole,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderDetail: (qrcode) => {
            dispatch(orderDetail(qrcode))
        },
        addEvent: (fulfilmentOrderId, eventName) => {
            dispatch(addEvent(fulfilmentOrderId, eventName))
        },
        deleteItem: (fulfilmentOrder, itemId) => {
            dispatch(deleteItem(fulfilmentOrder, itemId))
        },
        deleteBookItem: (fulfilmentOrder, bookingId) => {
            dispatch(deleteBookItem(fulfilmentOrder, bookingId))
        },
    }
}

const OrderItemListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderItemListPage)

export default OrderItemListContainer
