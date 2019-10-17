import {connect} from 'react-redux'
import RepairOrderView from '../../components/views/RepairOrderView'
import {
    partnerLoad,
} from 'actions/orderAction'

const mapStateToProps = state => {
    return {
        repairOrders: state.order.repairOrders,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRepairPartner: () => {
            
            dispatch(partnerLoad())
        },
    }
}

const RepairOrderViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps 
)(RepairOrderView)

export default RepairOrderViewContainer
