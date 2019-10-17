import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import history from '../../../history'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'
import CreatableSelect from 'react-select/lib/Creatable'

export class MergeTagPage extends Component {

    state = {
        tagItem: null,
        tagName: '',
        error: null,
        selectedOption: null,
    }
    componentDidMount() {
        if (!this.props.tagsData) {
            history.push('/tag-management')
            return
        }
        const tagItem = this.props.tagsData.find((el) =>
            el.id === Number(this.props.match.params.tagId)
        )

        if (!tagItem || !tagItem.name) {
            history.push('/tag-management')
            return
        }
        this.setState({ tagItem, tagName: tagItem.name })
        this.props.getTags()
    }

    handleChange = (newValue, actionMeta) => {
        this.setState({ selectedOption: newValue })
    };

    handleClose = (e) => {
        history.goBack()
    }

    handleNext = (e) => {
        this.props.deleteTagbyId(this.state.tagItem.id, this.state.selectedOption.value)
    }

    render() {
        const { t } = this.props
        let disabled = true
        if (this.state.selectedOption) {
            disabled = false
        }
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer /><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />

                    <div className="col-lg-12">
                        <div className="header fixed text-center d-flex">
                            <div className="col-lg-12">
                                <h2>{t('order.merge_tag')}</h2>

                            </div>
                            <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>
                        </div>

                        <div className='col-lg-12'>
                            {t('order.merge_tag_desc')}
                        </div>
                        <div className='col-lg-12'>
                            <h2>{t('order.selected_tag')}: <strong>{this.state.tagItem ? this.state.tagItem.name : ''}</strong></h2>
                        </div>

                        <div className='col-lg-12 mt-3'>
                            <h2>{t('order.choose_tag_head')}</h2>
                        </div>

                        <div className="col-lg-12">
                            {
                                this.state.tagItem
                                    ? <CreatableSelect
                                        isClearable
                                        onChange={ this.handleChange }
                                        options={ this.props.tags.filter(item => item.value !== this.state.tagItem.id) }
                                    />
                                    : ''
                            }
                        </div>
                        <div className="footer fixed text-center d-flex" style={ { zIndex: '1002' } }>
                            <button disabled={ disabled } type="button" className="btn-item-add" onClick={ (e) => this.handleNext(e) }>{t('order.merge')}</button>
                        </div>
                    </div>
                </div>

            </div></div></div></div>
        )
    }
}

export default withNamespaces()(MergeTagPage)
