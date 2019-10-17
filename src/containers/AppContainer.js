import {connect} from 'react-redux'
import App from '../components/App'

import {
    hideLoading,
} from 'actions/orderAction'

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideLoading: () => {
            dispatch(hideLoading())
        },
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
