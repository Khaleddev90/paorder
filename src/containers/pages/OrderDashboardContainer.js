import {connect} from 'react-redux'
import OrderDashboard from 'components/pages/OrderDashboard'
import {
    partnerLoad,
    setSearchType,
    setSortType,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        userRole: state.user.userRole,
        loading: state.order.loading,
        searchType: state.order.searchType,
        sort: state.order.sort,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRepairPartner: () => {
            dispatch(partnerLoad())
        },
        setSearchType: (type) => {
            dispatch(setSearchType(type))
        },
        setSortType: (sort) => {
            dispatch(setSortType(sort))
        },
    }
}

const OrderDashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDashboard)

export default OrderDashboardContainer
