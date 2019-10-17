import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import history from '../../../history'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class EditTagPage extends Component {

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
        this.props.updateTagbyId(this.state.tagItem.id, this.state.tagName)
    }

    render() {
        const { t, error } = this.props
        let disabled = true
        if (this.state.tagItem && this.state.tagItem.name !== this.state.tagName && this.state.tagName !== '') {
            disabled = false
        }
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer /><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />

                    <div className="col-lg-12">
                        <div className="header fixed text-center d-flex">
                            <div className="col-lg-12">
                                <h2>{t('order.edit_tag')}</h2>

                            </div>
                            <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>
                        </div>

                        <div className='col-lg-12'>
                            {t('order.edit_tag_desc')}
                        </div>
                        <div className='col-lg-12'>
                            <input type="text" className="form-control" value={ this.state.tagName }
                                onChange={ (e) => this.setState({ tagName: e.target.value, error: null }) }
                            />
                        </div>

                        {
                            error
                                ? <div className="col-lg-12 text-danger">
                                    {t('order.edit_tag_error')}
                                </div>
                                : ''
                        }
                        <div className="footer fixed text-center d-flex" style={ { zIndex: '1002' } }>
                            <button disabled={ disabled } type="button" className="btn-item-add" onClick={ (e) => this.handleNext(e) }>{t('common.save')}</button>
                        </div>
                    </div>
                </div>

            </div></div></div></div>
        )
    }
}

export default withNamespaces()(EditTagPage)
