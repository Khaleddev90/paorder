import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
class NewItem extends Component {

    handleChangeType = () => {
      
    }

    render() {
        const {t, handleClose, item} = this.props

        const switched = item.itemType === 'material' ? true : false

        return (
            <div style={ { marginLeft: '30px'} }>
                <div className='header fixed text-center d-flex'>
                    <div className='col-lg-12'>
                        <h2>{t('order.new_item')}</h2>
                        
                    </div>
                    <button type='button' className='btn btn-link btn-close' onClick={ (e) => handleClose(e) }><i className='fa fa-times fa-3x'></i></button>
                </div>

                {
                    item.itemType !== '' 
                        ? <div className='row mt-5'>
                            <div className="col-12">
                                { switched? t('order.material') : t('order.working_hours') }
                            </div>
                        </div>
                        : ''
                }

                {
                    item.itemName !== '' 
                        ? <div className='row mt-1'>
                            <div className='col-12'>
                                <h4>{item.itemName}</h4>
                            </div>
                        </div>
                        : ''
                }

                {
                    item.itemDescription !== '' 
                        ? <div className='row mt-1'>
                            <div className='col-12'>
                                {item.itemDescription}
                            </div>
                        </div>
                        : ''
                }

                {
                    item.itemPrice >= 0 
                        ? <div className='row mt-1'>
                            <div className='col-12'>
                                <h4>{item.itemPrice} &euro; </h4>
                            </div>
                        </div>
                        : ''
                }

                {
                    item.itemQuantity !== 0 
                        ? <div className='row mt-1'>
                            <div className='col-12'>
                                <h4>{item.itemQuantity}</h4>
                            </div>
                        </div>
                        : ''
                }
            </div>
            
        )

    }
}

export default withNamespaces()(NewItem)
