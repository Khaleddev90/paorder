import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import history from '../../history'
import { dataURItoBlob, getBrowserType} from 'utils/converting'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'
import Dropzone from 'react-dropzone'
import { NotificationManager} from 'react-notifications'

class CheckInPage extends Component {

    state = {
        currentStep: 0,
        photos: [],
        showFinish: false,
        orderItem: null,
        labelData: [],
        error: null,
    }

    componentDidMount() {
        if (!this.props.fulfilmentOrders) {
            history.push('/')
            return
        }
        const { t } = this.props
        const labelData = []
        labelData.push({
            firstLine: t('order.snap_picture'),
            secondLine: t('order.shipping_label'),
        })
        labelData.push({
            firstLine: t('order.snap_picture'),
            secondLine: t('order.order_number'),
        })
        labelData.push({
            firstLine: t('order.snap_some_picure'),
            secondLine: t('order.contents'),
            thirdLine: t('order.of_this_delivery'),
        })

        this.setState({ labelData: labelData })

        const orderItem = this.props.fulfilmentOrders.find((el) =>
            el.qrcode === this.props.match.params.qrcode
        )
        this.setState({ orderItem: orderItem })
    }

    onTakePhoto(dataUri) {
        this.setState(prevState => {
            let currentStep = prevState.currentStep + 1
            let showFinish = false
            if (currentStep > 2) {
                currentStep = 2
                showFinish = true
            }
            return {
                currentStep: currentStep,
                showFinish: showFinish,
            }
        })

        this.props.uploadPicture(this.state.orderItem.id, dataURItoBlob(dataUri), 'damage')
    }

    handlerFinishCheckIn = (e) => {
        localStorage.setItem('workingitem', this.state.orderItem.id)
        history.push('/checkin-complete/' + this.props.match.params.qrcode)
    }

    handlerCancel = (e) => {
        history.goBack()
    }

    handlerUpload = (file) => {
        
        if (file[0] instanceof Blob)
            this.onTakePhoto(file[0])
        
    }

    onDropRejected = () => {
        const { t } = this.props
        NotificationManager.error(t('error.maxfilesize'))
    }

    onCameraError = (e) => {
        const { t } = this.props

        let error = null

        if (e) {
            const browserType = getBrowserType()
            if (browserType === 'Chrome') {
                error = <div>{t('order.camera_error') + '-' + t('order.please_check_chromesetting')}</div>
            } else if (browserType === 'Firefox') {
                error = <div>{t('order.camera_error') + '-' + t('order.please_refresh')}</div>
            }

        }
        
        this.setState({ error })
    }
    render() {
        const { t } = this.props
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer /><div className="wrapper wrapper-content"><div className="container">
                <div className="camera-layer">
                    {
                        !this.state.error 
                            ? <Camera
                                onTakePhoto={ (dataUri) => {
                                    this.onTakePhoto(dataUri)
                                } }
                                idealFacingMode={ FACING_MODES.ENVIRONMENT }
                                imageType={ IMAGE_TYPES.JPG }
                                imageCompression={ 0.8 }
                                isMaxResolution={ false }
                                isImageMirror={ false }
                                isDisplayStartCameraError={ false }
                                onCameraError={ this.onCameraError }
                                sizeFactor={ 0.8 }
                            />
                            : ''
                    }

                    <div className="camera-top-banner">
                        {this.state.labelData.length > 0 && !this.state.error
                            ? <div>
                                <div>{this.state.labelData[this.state.currentStep].firstLine} <strong>{this.state.labelData[this.state.currentStep].secondLine}</strong> 
                                    {this.state.labelData[this.state.currentStep].thirdLine ? ' ' + this.state.labelData[this.state.currentStep].thirdLine : ''}</div>
                            </div>
                            : <div>
                                <div>{this.state.error}</div>
                            </div>
                        }

                    </div>

                    {this.state.showFinish
                        ? <div className="camera-bottom-banner">
                            <Loader loading={ this.props.uploading } />
                            <button type="button" className="btn btn-warning finishcheck" onClick={ (e) => this.handlerFinishCheckIn(e) }>{t('order.finish_checkin')}</button>
                            <div>{t('order.finish_desc1')}</div>
                            <div>{t('order.finish_desc2')}</div>
                        </div>
                        : ''}

                    <button type="button" className="btn btn-link camera-close" onClick={ (e) => this.handlerCancel(e) }><i className="fa fa-times fa-3x"></i> </button>
                    <button type="button" className="btn btn-link camera-upload" onClick={ (e) => this.handlerUpload(e) }>
                        <Dropzone
                            className="camera-dropzone"
                            maxSize={ 1024*1024*6 }
                            onDrop={ (file) => this.handlerUpload(file) }
                            onDropRejected={ this.onDropRejected } 
                            multiple={ false }
                            accept="image/*"
                        ><i className="fa fa-upload fa-3x"></i>
                        </Dropzone>
                    </button>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(CheckInPage)
