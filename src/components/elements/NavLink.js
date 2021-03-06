/* eslint-disable react/no-children-prop */
import * as React from 'react'
import {Link, Route} from 'react-router-dom'

class NavLink extends React.Component {
    componentDidMount() {

    }
    render() {
        const {to, exact, strict, activeClassName, className, activeStyle, style, isActive: getIsActive, ...rest} = this.props
        return (
            <Route
                path={ typeof to === 'object' ? to.pathname : to }
                exact={ exact }
                strict={ strict }
                children={ ({location, match}) => {
                    const isActive = !!(getIsActive ? getIsActive(match, location) : match)

                    return (
                        <li
                            className={ isActive ? [activeClassName, className].join(' ') : className }
                            style={ isActive ? {...style, ...activeStyle} : style }>
                            <Link
                                to={ to }
                                { ...rest }
                            />
                        </li>
                    )
                } }
            />
        )
    }
}

export default NavLink
