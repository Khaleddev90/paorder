import {connect} from 'react-redux'
import TakePicturePage from 'components/pages/TakePicturePage'
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

const TakePictureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TakePicturePage)

export default TakePictureContainer
