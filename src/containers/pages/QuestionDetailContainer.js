import {connect} from 'react-redux'
import QuestionDetailPage from 'components/pages/QuestionDetailPage'
import {
    addAnswer,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        userRole: state.user.userRole,
        userId: state.user.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addAnswer: ( questionId, content ) => {
            dispatch(addAnswer( questionId, content ))
        },
    }
}

const QuestionDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionDetailPage)

export default QuestionDetailContainer
