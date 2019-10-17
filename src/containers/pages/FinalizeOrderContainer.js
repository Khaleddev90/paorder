import {connect} from 'react-redux'
import FinalizeOrderPage from 'components/pages/FinalizeOrderPage'
import {
    addEvent,
    addTrackingNumber,
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
        addTrackingNumber: (fulfilmentOrderId, trackingNumber, routeTag, carrier) => {
            dispatch(addTrackingNumber(fulfilmentOrderId, trackingNumber, routeTag, carrier))
        },
    }
}

const FinalizeOrderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FinalizeOrderPage)

export default FinalizeOrderContainer
