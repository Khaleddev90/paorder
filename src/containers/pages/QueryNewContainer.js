import {connect} from 'react-redux'
import QueryNewPage from 'components/pages/QueryNewPage'
import {
    addQuestion,
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
        addQuestion: (fulfilmentOrderId, questionTitle) => {
            dispatch(addQuestion(fulfilmentOrderId, questionTitle))
        },
    }
}

const QueryNewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(QueryNewPage)

export default QueryNewContainer
