import React from 'react'
import PropTypes from 'prop-types'

const RemoveComponent = (props) => {
    const { readOnly, removeComponent, onClick, className } = props
    if (readOnly) {
        return <span />
    }

    if (removeComponent) {
        const Component = removeComponent
        return <Component { ...props } />
    }

    return (
        <a onClick={ onClick } className={ className } onKeyDown={ onClick }>
            <i className="fa fa-trash-alt"></i>
        </a>
    )
}

RemoveComponent.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    removeComponent: PropTypes.func,
}

export default RemoveComponent
