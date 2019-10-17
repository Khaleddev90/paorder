import {connect} from 'react-redux'
import EditReturnPage from 'components/pages/EditReturnPage'
import {
    updateDeliveryAddress,
    setCurrentlyEdit,
    orderDetail,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrder: state.order.fulfilmentOrder,
        userRole: state.user.userRole,
        loading: state.order.loading,
        error: state.order.error,
        currentlyEdit: state.order.currentlyEdit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderDetail: (qrcode) => {
            dispatch(orderDetail(qrcode))
        },
        updateDeliveryAddress: (fulfilmentOrder, shippingInfo) => {
            dispatch(updateDeliveryAddress(fulfilmentOrder, shippingInfo))
        },
        setCurrentlyEdit: (edit) => {
            dispatch(setCurrentlyEdit(edit))
        },
    }
}

const EditReturnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditReturnPage)

export default EditReturnContainer
