import {connect} from 'react-redux'
import ProcessingCompletePage from 'components/pages/ProcessingCompletePage'
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

const ProcessingCompleteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProcessingCompletePage)

export default ProcessingCompleteContainer
