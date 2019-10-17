import {connect} from 'react-redux'
import ScanQRCodePage from '../../components/pages/ScanQRCodePage'

const mapStateToProps = state => {
    return {
        fulfilmentOrders: state.order.fulfilmentOrders,
    }
}

const ScanQRCodePageContainer = connect(
    mapStateToProps
)(ScanQRCodePage)

export default ScanQRCodePageContainer
