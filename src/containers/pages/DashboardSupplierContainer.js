import {connect} from 'react-redux'
import DashboardSupplier from 'components/pages/DashboardSupplier'
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

const DashboardSupplierContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardSupplier)

export default DashboardSupplierContainer
