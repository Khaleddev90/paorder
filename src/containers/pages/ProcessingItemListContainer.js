import {connect} from 'react-redux'
import ProcessingItemListPage from 'components/pages/ProcessingItemListPage'
import {
    addEvent,
    addItem,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        userRole: state.user.userRole,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEvent: (fulfilmentOrderId, eventName, qrcode) => {
            dispatch(addEvent(fulfilmentOrderId, eventName, qrcode))
        },
        addItem: (fulfilmentOrderId, itemType, itemName, itemDescription) => {
            dispatch(addItem(fulfilmentOrderId, itemType, itemName, itemDescription))
        },
    }
}

const ProcessingItemListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProcessingItemListPage)

export default ProcessingItemListContainer
