import React, {Component} from 'react'
import AxiosConfig from '../conf/AxiosConfig'
import '../theme/theme.css'
import history from '../history'
import ReloadModal from './ReloadModal'
import LoginFormContainer from 'containers/forms/LoginFormContainer'
import ResetPasswordContainer from 'containers/forms/ResetPasswordContainer'
import ConfirmEmailContainer from 'containers/forms/ConfirmEmailContainer'
import ConfirmResetPasswordContainer from 'containers/forms/ConfirmResetPasswordContainer'
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import ScanQRCodePageContainer from 'containers/pages/ScanQRCodePageContainer'
import RepairOrderPageContainer from 'containers/pages/RepairOrderPageContainer'
import OrderDashboardContainer from 'containers/pages/OrderDashboardContainer'
import OrderDashboardSupplierContainer from 'containers/pages/OrderDashboardSupplierContainer'
import CreateOrderContainer from 'containers/pages/CreateOrderContainer'
import OrderDetailContainer from 'containers/pages/OrderDetailContainer'
import QuestionDetailContainer from 'containers/pages/QuestionDetailContainer'
import DashboardContainer from 'containers/pages/DashboardContainer'
import DashboardSupplierContainer from 'containers/pages/DashboardSupplierContainer'
import CheckInContainer from 'containers/pages/CheckInContainer'
import TakePictureContainer from 'containers/pages/TakePictureContainer'
import CheckInCompleteContainer from 'containers/pages/CheckInCompleteContainer'
import OrderItemListContainer from 'containers/pages/OrderItemListContainer'
import AddNewItemContainer from 'containers/pages/AddNewItemContainer'
import EditReturnContainer from 'containers/pages/EditReturnContainer'
import AssessmentCompleteContainer from 'containers/pages/AssessmentCompleteContainer'
import ProcessingItemListContainer from 'containers/pages/ProcessingItemListContainer'
import ProcessingCompleteContainer from 'containers/pages/ProcessingCompleteContainer'
import FinalizeOrderContainer from 'containers/pages/FinalizeOrderContainer'
import ShippingFinalContainer from 'containers/pages/ShippingFinalContainer'
import FinalizeOrderNotrackingContainer from 'containers/pages/FinalizeOrderNotrackingContainer'
import UserManagementContainer from 'containers/pages/UserManagement/UserManagementContainer'
import InviteNewUserContainer from 'containers/pages/UserManagement/InviteNewUserContainer'
import UserOverViewContainer from 'containers/pages/UserManagement/UserOverViewContainer'
import TagManagementContainer from 'containers/pages/TagManagement/TagManagementContainer'
import EditTagContainer from 'containers/pages/TagManagement/EditTagContainer'
import MergeTagContainer from 'containers/pages/TagManagement/MergeTagContainer'
import DeleteTagContainer from 'containers/pages/TagManagement/DeleteTagContainer'
import QueryOverviewContainer from 'containers/pages/QueryOverviewContainer'
import QueryDetailContainer from 'containers/pages/QueryDetailContainer'
import QueryNewContainer from 'containers/pages/QueryNewContainer'
import AddTagContainer from 'containers/pages/AddTagContainer'
import NotFoundContainer from 'components/NotFound'
import {NotificationContainer} from 'react-notifications'
import Gallery from 'components/elements/Gallery'
class App extends Component {

    constructor(props) {
        super(props)
    
        if (window.performance) {
            if (performance.navigation.type === 1) {
                // this page is reloaded
                props.hideLoading()
            }
        }
    }

    componentDidMount() {
        AxiosConfig.init()
    }

    render() {
        const {authorized} = this.props.user

        const PrivateRoute = ({ component: Comp, ...rest }) => {
            return (
                <Route 
                    { ...rest }
                    render={ (props) => authorized 
                        ? <Comp { ...props }/>
                        : <Redirect to={ { pathname: '/login', state: { from: props.location }} }/> }/>
            )
        }

        const PrivateRouteForManager = ({ component: Comp, ...rest }) => {
            return (
                <Route 
                    { ...rest }
                    render={ (props) => authorized && this.props.user.userRole.manager
                        ? <Comp { ...props }/>
                        : <Redirect to={ { pathname: '/login', state: { from: props.location }} }/> }/>
            )
        }

        let DashboardRedirect = null
        if (this.props.user.userRole && this.props.user.userRole.supplierId !== null) {
            DashboardRedirect = () => <Redirect to='/dashboard-supplier' />
        } else {
            DashboardRedirect = () => <Redirect to='/dashboard' />
        }
        
        const NotFoundRedirect = () => <Redirect to='/not-found' />
        return (
            <div className='App'>
                <NotificationContainer/>
                <ReloadModal />
                <Router history={ history }>
                    <Switch>
                        <Route path='/login' component={ LoginFormContainer }/>
                        <Route path='/reset-password/:success' component={ ResetPasswordContainer } />
                        <Route path='/not-found' component={ NotFoundContainer }/>
                        <PrivateRoute path='/show-gallery' component={ Gallery } />
                        <PrivateRoute exact path='/' component={ DashboardRedirect }/>
                        <PrivateRoute exact path='/dashboard' component={ DashboardContainer }/>
                        <PrivateRoute exact path='/dashboard-supplier' component={ DashboardSupplierContainer }/>
                        <PrivateRoute path='/scan' component={ ScanQRCodePageContainer }/>
                        <PrivateRoute path='/repairOrder/:qrcode' component={ RepairOrderPageContainer }/>
                        <PrivateRoute path='/order-dashboard' component={ OrderDashboardContainer }/>
                        <PrivateRoute path='/order-dashboard-supplier' component={ OrderDashboardSupplierContainer }/>
                        <PrivateRoute path='/order-detail/:qrcode/:from' component={ OrderDetailContainer }/>
                        <PrivateRoute path='/show-question/:fulfilmentId/:questionId' component={ QuestionDetailContainer }/>
                        <PrivateRoute path='/create-order' component={ CreateOrderContainer }/>
                        <PrivateRoute path='/checkin/:qrcode' component={ CheckInContainer }/> 
                        <PrivateRoute path='/takepicture/:qrcode' component={ TakePictureContainer }/> 
                        <PrivateRoute path='/checkin-complete/:qrcode' component={ CheckInCompleteContainer }/>
                        <PrivateRoute path='/assessment-complete/:qrcode' component={ AssessmentCompleteContainer }/>
                        <PrivateRoute path='/orderitemlist/:qrcode' component={ OrderItemListContainer }/>
                        <PrivateRoute path='/processing-items/:qrcode' component={ ProcessingItemListContainer }/>
                        <PrivateRoute path='/addnewitem/:fulfilmentId' component={ AddNewItemContainer }/>
                        <PrivateRoute path='/processing-complete/:qrcode' component={ ProcessingCompleteContainer }/>
                        <PrivateRoute path='/finalize-order/:qrcode' component={ FinalizeOrderContainer }/>
                        <PrivateRoute path='/finalize-ordernotracking/:qrcode' component={ FinalizeOrderNotrackingContainer }/>
                        <PrivateRoute path='/order-complete/:fulfilmentId' component={ ShippingFinalContainer }/>
                        <PrivateRoute path='/add-tag/:fulfilmentId' component={ AddTagContainer }/>
                        <PrivateRouteForManager path='/user-management' component={ UserManagementContainer }/>
                        <PrivateRouteForManager path='/invite-new-user' component={ InviteNewUserContainer }/>
                        <PrivateRouteForManager path='/user-overview' component={ UserOverViewContainer }/>
                        <PrivateRoute path='/query' component={ QueryOverviewContainer } /> 
                        <PrivateRoute path='/query-detail/:qrcode' component={ QueryDetailContainer } />
                        <PrivateRoute path='/query-new/:qrcode' component={ QueryNewContainer } />
                        <Route path='/confirm-email/:confirmEmailToken' component={ ConfirmEmailContainer } />
                        <PrivateRoute path='/users/:userId/reset-password/:jwtToken' component={ ConfirmResetPasswordContainer } />
                        <PrivateRouteForManager path='/tag-management' component={ TagManagementContainer }/>
                        <PrivateRouteForManager path='/edit-tag/:tagId' component={ EditTagContainer }/>
                        <PrivateRouteForManager path='/merge-tag/:tagId' component={ MergeTagContainer }/>
                        <PrivateRouteForManager path='/delete-tag/:tagId' component={ DeleteTagContainer }/>
                        <PrivateRoute path='/edit-return/:qrcode' component={ EditReturnContainer }/>
                        <Route component={ NotFoundRedirect } />

                    </Switch>
                    
                </Router>
                
            </div>
        )
    }
}

export default App
