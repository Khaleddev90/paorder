import {connect} from 'react-redux'
import CreateOrderPage from 'components/pages/CreateOrderPage'
import {
    createOrder,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        order: state.order,
        userRole: state.user.userRole,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOrder: (model) => {
            dispatch(createOrder(model))
        },
    }
}

const CreateOrderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateOrderPage)

export default CreateOrderContainer
