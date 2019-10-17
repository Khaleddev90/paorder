import React, {Component} from 'react'

class Alert extends Component {

    componentDidMount() {
        
    }
    render() {
        const {level, text} = this.props
        return (
            <div className={ 'Alert alert alert-' + (level ? level : 'success') }>
                {text}
            </div>
        )
    }
}

export default Alert
