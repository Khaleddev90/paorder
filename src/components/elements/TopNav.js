import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import {Navbar, NavbarToggler, Collapse, Nav} from 'reactstrap'
import {Link} from 'react-router-dom'
import NavLink from './NavLink'
import logo from 'theme/inspinia/img/logo-liventy.png'

class TopNav extends Component {

    constructor(props) {
        super(props)

        this.toggleLeft = this.toggleLeft.bind(this)
        this.toggleRight = this.toggleRight.bind(this)
        this.state = {
            isLeftOpen: false,
            isRightOpen: false,
            navClass: 'navbar-fixed-top',
            currentLang : localStorage.getItem('currentLanguage') ? localStorage.getItem('currentLanguage') : 'EN',
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = e => {

        if (window.scrollY > 30) {
            this.setState({navClass: 'navbar-fixed-top scroll'})
        } else {
            this.setState({navClass: 'navbar-fixed-top'})
        }
    }
    toggleLeft() {
        this.setState({
            isLeftOpen: !this.state.isLeftOpen,
        })
    }

    toggleRight() {
        this.setState({
            isRightOpen: !this.state.isRightOpen,
        })
    }

    changeLanguage = () => {
        const { i18n } = this.props

        if (this.state.currentLang === 'EN') {
            i18n.changeLanguage('de')
            this.setState({currentLang: 'DE'})
            localStorage.setItem('currentLanguage', 'DE')
        } else {
            i18n.changeLanguage('en')
            this.setState({currentLang: 'EN'})
            localStorage.setItem('currentLanguage', 'EN')
        }
        this.setState({
            isRightOpen: !this.state.isRightOpen,
        })
    }

    render() {
        const { t } = this.props

        return (
            <div className='row border-bottom white-bg'>
                <Navbar expand='lg' fixed='top' className={ this.state.navClass }>
                    <div className='BrandLogo'>
                        {this.props.user.userRole === 'supplier'
                            ? <Link className='navbar-brand' to='/dashboard-supplier'>
                                <img src={ logo } style={ {height: '24px'} } alt=''></img>
                                <span key={ window.scrollY } className='nav-name'>{this.props.user.displayName}</span>
                            </Link>
                            : <Link className='navbar-brand' to='/dashboard'>
                                <img src={ logo } style={ {height: '24px'} } alt=''></img>
                                <span key={ window.scrollY } className='nav-name'>{this.props.user.displayName}</span>
                            </Link>
                        }                        
                        
                    </div>
                    
                    <NavbarToggler onClick={ this.toggleRight }/>
                    <Collapse isOpen={ this.state.isRightOpen } navbar>
                        <Nav navbar className='nav navbar-top-links '>
                            <NavLink exact to='/order-dashboard/ALL' activeClassName='active' onClick={ this.toggleRight }>
                                <i className='fa fa-search'/> {t('common.seaarch_orders')}
                            </NavLink>
                        </Nav>
                        <Nav navbar className='nav navbar-top-links navbar-right'>
                            
                            <NavLink exact to='/' activeClassName='active' onClick={ this.toggleRight }>
                                <i className='fa fa-chart-line'/> {t('common.reports')}
                            </NavLink>
                        </Nav>
                        <Nav navbar className='nav navbar-top-links navbar-right'>
                            
                            <NavLink exact to='#' activeClassName='active' onClick={ e => this.changeLanguage() }>
                                <i className='fa fa-globe'/> {t('common.language')} : {this.state.currentLang}
                            </NavLink>
                        </Nav>
                        {this.props.user.userRole.manager
                            ? <Nav navbar className='nav navbar-top-links navbar-right'>
                                <NavLink exact to='/tag-management' activeClassName='active' onClick={ this.toggleRight }>
                                    <i className='fa fa-tags'/> {t('order.tag_management')}
                                </NavLink>
                            </Nav>
                            : ''
                        }
                        {this.props.user.userRole.manager
                            ? <Nav navbar className='nav navbar-top-links navbar-right'>
                                
                                <NavLink exact to='/user-management' activeClassName='active' onClick={ this.toggleRight }>
                                    <i className='fa fa-users'/> {t('order.user_management')}
                                </NavLink>
                            </Nav>
                            : ''
                        }
                        <Nav navbar className='nav navbar-top-links navbar-right'>
                            <li>
                                <a onClick={ this.props.logout }>
                                    <i className='fa fa-sign-out'/> {t('topNav.logout')}
                                </a>
                            </li>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withNamespaces()(TopNav)
