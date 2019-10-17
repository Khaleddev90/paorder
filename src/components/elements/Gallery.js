import React, { Component, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import history from '../../history'
import Image from 'components/elements/Image'

class Gallery extends Component {

    state = {
        index: 0,
    }

    handleClose = (e) => {
        history.goBack()
    }

    handleGoLeft = (e) => {
        this.setState(prevState =>{
            let index = prevState.index - 1
            if (index < 0) {
                index = 0
            }
            return {index : index}
        })
    }

    handleGoRight = (e) => {
        this.setState(prevState =>{
            let index = prevState.index + 1
            if (index >= this.props.location.state.pictures.length) {
                index = this.props.location.state.pictures.length - 1
            }
            return {index : index}
        })
    }

    render() {

        const beforeDisable = this.state.index === 0 ? true: false
        const nextDisable = this.state.index === this.props.location.state.pictures.length - 1 ? true: false

        const pictureItem = this.props.location.state.pictures[this.state.index]
        return (
            <div id="wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="header fixed text-center d-flex">
                            <div className="col-lg-12">
                                <h4 style={ {textAlign: 'left'} }>{this.props.location.state.claimReference}</h4>
                            </div>
                            <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>
                        </div>

                        {
                            pictureItem.filename 
                                ? <Fragment>
                                    <div className='col-lg-12'>
                                        <Image pic={ pictureItem.filename } showGallery={ true }/>
                                    </div>

                                    <div className="footer fixed text-center d-flex justify-content-between" style={ { zIndex: '1002' } }>
                                        <button disabled={ beforeDisable } type='button' className='btn float-left' 
                                            onClick={ (e) => this.handleGoLeft(e) }><i className='fa fa-4x fa-chevron-left'></i></button>
                                        
                                        <button disabled={ nextDisable } type='button' className='btn float-right' 
                                            onClick={ (e) => this.handleGoRight(e) }><i className='fa fa-4x fa-chevron-right'></i> </button>
                                    </div>
                                </Fragment>
                                :''
                        }
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default withNamespaces()(Gallery)
