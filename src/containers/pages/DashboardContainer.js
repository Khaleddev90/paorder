import {connect} from 'react-redux'
import Dashboard from 'components/pages/Dashboard'
import {
    partnerLoad,
    setSearchType,
    setSortType,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        userRole: state.user.userRole,
        user: state.user,
        loading: state.order.loading,
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

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default DashboardContainer
