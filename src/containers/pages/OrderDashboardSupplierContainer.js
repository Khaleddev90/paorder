import {connect} from 'react-redux'
import OrderDashboardSupplier from 'components/pages/OrderDashboardSupplier'
import {
    supplierLoad,
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
        supplierLoad: (type) => {
            dispatch(supplierLoad(type))
        },
    }
}

const OrderDashboardSupplierContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDashboardSupplier)

export default OrderDashboardSupplierContainer
