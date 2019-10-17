import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import { BrowserMultiFormatReader } from '@zxing/library'
import history from '../../history'

class ScanQRCodePage extends Component {
   
    componentWillMount() {
        const script = document.createElement('script')
        script.setAttribute('id', 'zxing')
        
        script.onload = () => {
            
            this.codeReader = new BrowserMultiFormatReader()
            this.decodeCamera()
        }

        script.src = 'https://unpkg.com/@zxing/library@latest'
        document.getElementsByTagName('head')[0].appendChild(script)

    }

    componentWillUnmount () {

        const zxing = document.getElementById('zxing')

        if (zxing) {
            zxing.remove()
        }
        if (this.codeReader) {
            this.codeReader.reset()
        }
        
    }

    decodeCamera = () => {
        this.codeReader.decodeFromInputVideoDevice(undefined, 'video').then((result) => {
            
            const orderItem = this.props.fulfilmentOrders.find((el) =>
                el.qrcode === result.text
            )

            if (orderItem) {
                history.push(`/order-detail/${result.text}/order`)
                return
            } else {
                this.decodeCamera()
            } 
            
            document.getElementById('result').textContent = result.text
        // eslint-disable-next-line handle-callback-err
        }).catch((err) => {
            window.alert(err)
        })

    }

    handlerCancel = (e) => {
        history.goBack()
    }
    
    render() {

        return (
            <div className="camera-layer">
                <video
                    id="video"
                    width="100vw"
                    height="100vh"
                ></video>

                <button type="button" className="btn btn-link camera-close" onClick={ (e) => this.handlerCancel(e) }><i className="fa fa-times fa-3x"></i> </button>
            </div>
        )
    }
}

export default withNamespaces()(ScanQRCodePage)
