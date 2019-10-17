import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

class SearchFilter extends Component {
    state = {
        orderItem: null,
        newItem: {
            itemType: '',
            itemReference: '',
            itemDescription: '',
            itemName: '',
            itemPrice: -1,
            itemQuantity: 0,
        },
        itemReference: '',
        itemDescription: '',
        itemName: '',
        itemPrice: 100,
        itemQuantity: 1,
        currentStep: 0, // 0 item type, 1 
        switched: false,
        error: null,
    }

    render() {
        const {t, seletectType, currentState, sort} = this.props       

        const title = seletectType === 'state' ? t('order.search_filter') : t('order.search_sorting')

        let dataArray = []

        let selectedIndex = -1
        if (seletectType === 'state') {
            dataArray = [
                t('common.all'), 
                t('order.Currently_workingon'), 
                t('order.Due_assessment'),
                t('order.Expected_checkin'),
                t('order.Pending_Approval'),
                t('order.Ready_shipment'),
                t('order.Waiting_processing'),
                t('order.closed'),
            ]

            if (currentState === 'ALL') {
                selectedIndex = 0
            } else if (currentState === 'ASSESSMENT') {
                selectedIndex = 1
            } else if (currentState === 'RECEIVED') {
                selectedIndex = 2
            } else if (currentState === 'CONFIRMED') {
                selectedIndex = 3
            } else if (currentState === 'APPROVAL_COST_ESTIMATE') {
                selectedIndex = 4
            } else if (currentState === 'READY_FOR_SHIPMENT') {
                selectedIndex = 5
            } else if (currentState === 'APPROVED') {
                selectedIndex = 6
            } else if (currentState === 'CLOSED') {
                selectedIndex = 7
            }
        } else {
            dataArray = [
                t('order.oldest_order_first'),
                t('order.newest_order_first'),
                t('order.oldest_update_first'),
                t('order.newest_update_first'),
            ]

            if (sort === 'nof') {
                selectedIndex = 1
            } else if (sort === 'oof') {
                selectedIndex = 0
            } else if (sort === 'ouf') {
                selectedIndex = 2
            } else if (sort === 'nuf') {
                selectedIndex = 3
            }
        }

        return (
            <div className="header fixed text-center " style={ {height: '100vh'} }>
                <div className="col-lg-12">
                    <h2>{title}</h2>
                    
                </div>
                <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.props.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>

                <div className="table-responsive">
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4">
                        <table className="table table-hover " id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid">
                            <tbody>
                                {
                                    dataArray.map((item, key) => (
                                        <tr className="gradeA odd" key={ key } role="row" onClick={ () => this.props.handleSelectFilter(key) }>
                                            <td style={ {textAlign: 'left'} }> <input style={ {marginRight: '10px'} } readOnly type="radio" 
                                                checked={ key === selectedIndex ? true: false } value="option1" id="optionsRadios1" name="optionsRadios"></input>{item}</td>
                                        
                                        </tr>
                                    
                                    ))
                                }
                                
                            </tbody>
                            
                        </table>
                    
                    </div>
                </div>
            </div>

        )
    }
}

export default withNamespaces()(SearchFilter)
