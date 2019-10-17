import {connect} from 'react-redux'
import CheckInCompletePage from 'components/pages/CheckInCompletePage'
import {
    orderDetail,
    addEvent,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        userRole: state.user.userRole,
        searchType: state.order.searchType,
        sort: state.order.sort,
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
    }
}

const CheckInCompleteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckInCompletePage)

export default CheckInCompleteContainer
