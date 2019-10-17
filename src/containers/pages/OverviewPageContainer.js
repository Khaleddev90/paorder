import {connect} from 'react-redux'
import {partnerLoad} from 'actions/orderAction'
import OverviewPage from 'components/pages/OverviewPage'

const mapDispatchToProps = dispatch => {
    return {
        getRepairPartner: () => {
            
            dispatch(partnerLoad())
        },
    }
}

const mapStateToProps = (state) => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
        userRole: state.user.userRole,
    }
}

const OverviewPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewPage)

export default OverviewPageContainer
