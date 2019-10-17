import React, {Component} from 'react'

class FormSubmit extends Component {
    componentDidMount() {

    }
    render() {
        const { level, text, onClickHandler, loading, disabled, block, icon, right } = this.props
        return (
            <button type="submit" className={ 'btn btn-' + (level ? level : 'primary') + (block ? ' block full-width' : '') + (right ? ' float-right' : '') } 
                onClick={ onClickHandler ? (e) => onClickHandler(e) : null } disabled={ (loading || disabled) }>
                <i className={ 'm-r-xs fas fa-' + (loading ? 'spinner fa-spin' : (icon ? icon : '')) }/>
                {text}
            </button>
        )
    }
}

export default FormSubmit
