import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import history from '../../history'
import TopNavContainer from 'containers/elements/TopNavContainer'

class DashboardSupplier extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: '',
        }
    }
    componentDidMount() {
        // this.props.supplierLoad(this.state.type)
    }

    componentWillReceiveProps(nextProps) {
        
        history.push('/order-dashboard-supplier')
        
    }
    
    render() {
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                </div>
            </div></div></div></div>
                
        )
    }
}

export default withNamespaces()(DashboardSupplier)
