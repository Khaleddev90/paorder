import {connect} from 'react-redux'
import CheckInPage from 'components/pages/CheckInPage'
import {
    uploadPicture,
    partnerLoad,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        userRole: state.user.userRole,
        fulfilmentOrders: state.order.fulfilmentOrders,
        uploading: state.order.uploading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadPicture: (id, photo, type) => {
            dispatch(uploadPicture(id, photo, type))
        },
        getRepairPartner: () => {
            dispatch(partnerLoad())
        },
    }
}

const CheckInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckInPage)

export default CheckInContainer
