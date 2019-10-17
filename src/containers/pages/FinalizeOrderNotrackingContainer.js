import {connect} from 'react-redux'
import FinalizeOrderNotrackingPage from 'components/pages/FinalizeOrderNotrackingPage'
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

const FinalizeOrderNotrackingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FinalizeOrderNotrackingPage)

export default FinalizeOrderNotrackingContainer
