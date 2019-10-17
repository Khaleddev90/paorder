import {connect} from 'react-redux'
import QueryOverviewPage from 'components/pages/QueryOverviewPage'
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

const QueryOverviewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(QueryOverviewPage)

export default QueryOverviewContainer
