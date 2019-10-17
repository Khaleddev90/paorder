import {connect} from 'react-redux'
import RepairOrderPage from 'components/pages/RepairOrderPage'
import {
    partnerLoad,
} from 'actions/orderAction'

const mapStateToProps = (state, props) => {
    return {
        partnerOrder: state.order.fulfilmentOrders.find((el) =>
            el.qrcode === props.match.params.qrcode
        ),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRepairPartner: () => {
            dispatch(partnerLoad())
        },
    }
}

const RepairOrderPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RepairOrderPage)

export default RepairOrderPageContainer
