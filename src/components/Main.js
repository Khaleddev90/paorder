import React, {Component} from 'react'
import history from '../history'
import {connect} from 'react-redux'
class Main extends Component {

    componentDidMount() {
        if (this.props.user.userRole === 'supplier') {
            history.push('/dashboard-supplier')
        } else {
            history.push('/dashboard')
        }
    }

    render() {
        return (
            <div>test</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default MainContainer
