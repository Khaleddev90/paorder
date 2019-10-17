import {connect} from 'react-redux'
import TopNav from '../../components/elements/TopNav'
import {logout} from '../../actions/authAction'

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
        },
    }
}

const TopNavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav)

export default TopNavContainer
