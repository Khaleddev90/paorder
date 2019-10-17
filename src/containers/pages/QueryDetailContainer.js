import {connect} from 'react-redux'
import QueryDetailPage from 'components/pages/QueryDetailPage'
import {
    addAnswer,
    orderDetail,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrder: state.order.fulfilmentOrder,
        fulfilmentOrders: state.order.fulfilmentOrders,
        user: state.user,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addAnswer: (questionId, content, qrcode) => {
            dispatch(addAnswer(questionId, content, qrcode))
        },
        orderDetail: (qrcode) => {
            dispatch(orderDetail(qrcode))
        },
    }
}

const QueryDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(QueryDetailPage)

export default QueryDetailContainer
