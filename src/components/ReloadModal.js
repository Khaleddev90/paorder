import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
import {connect} from 'react-redux'

import {
    resetApp,
} from 'actions/authAction'

class ReloadModalPage extends Component {
    state = {
        show: false,
    };
    componentDidMount() {
        // Handle global event.
        window.addEventListener('newContentAvailable', () => {
            this.setState({
                show: true,
            })
        })
    }
    onCloseModal = () => {
        // Reload when modal click.

        this.props.resetApp()
        this.setState({show: false})

        setTimeout (() => {
            window.location.replace('/')
        }, 500)
    };
    render() {
        if (!this.state.show) {
            return null
        }
        // <Modal> is common fixed component.
        return (
            <Modal open={ this.state.show } onClose={ this.onCloseModal } center>
                <p></p>
                <span> New Content Available! Reload Now! </span>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetApp: () => {
            dispatch(resetApp())
        },
    }
}

const ReloadModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReloadModalPage)

export default ReloadModal
