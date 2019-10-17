import React, {Component} from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {withNamespaces} from 'react-i18next'
class NotFound extends Component {

    componentDidMount() {
        
    }

    render() {
        const {t} = this.props
        return (
            <div><div className="middle-box text-center animated fadeInDown">
                <h1>404</h1>
                <h3 className="font-bold">{t('common.page_notfound')}</h3>
    
                <div className="error-desc">
                    {t('common.not_found_desc')}<p></p>
                    <button type="submit" onClick={ (e)=> history.push('/') } className="btn btn-primary">{t('common.gohome')}</button>
                
                </div>
            </div></div>
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

const NotFoundContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withNamespaces()(NotFound))

export default NotFoundContainer
