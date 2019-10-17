import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import history from '../../../history'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class DeleteTagPage extends Component {

    state = {
        tagItem: null,
        tagName: '',
        error: null,
    }
    componentDidMount() {
        if (!this.props.tagsData) {
            history.push('/tag-management')
            return
        }
        const tagItem = this.props.tagsData.find((el) =>
            el.id === Number(this.props.match.params.tagId)
        )

        this.setState({ tagItem, tagName: tagItem.name })
    }

    handleClose = (e) => {
        history.push('/tag-management')
    }

    handleNext = (e) => {
        this.props.deleteTagbyId(this.state.tagItem.id)
    }

    render() {
        const { t } = this.props
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer /><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />

                    {this.state.tagItem ?
                        <div className="col-lg-12">
                            <div className="header fixed text-center d-flex">
                                <div className="col-lg-12">
                                    <h2>{t('order.delete_tag')}</h2>
                                </div>
                                <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>
                            </div>

                            <div className='col-lg-12'>
                                {t('order.delete_tag_desc')}
                            </div>
                            <div className='col-lg-12'>
                                <h2>{t('order.selected_tag')}: <strong>{ this.state.tagItem.name }</strong></h2>
                            </div>

                            <div className="footer fixed text-center d-flex" style={ { zIndex: '1002' } }>
                                <button type="button" className="btn-item-add" onClick={ (e) => this.handleNext(e) }>{t('order.delete_tag')}</button>
                            </div>
                        </div>
                        : ''}
                </div>

            </div></div></div></div>
        )
    }
}

export default withNamespaces()(DeleteTagPage)
