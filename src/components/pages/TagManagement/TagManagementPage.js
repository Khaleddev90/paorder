import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import history from '../../../history'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

class TagManagementPage extends Component {

    componentDidMount() {
        this.props.getTags()
    }

    handleClose = (e) => {
        history.push('/')
    }

    handleDelete = (item) => {
        history.push('/delete-tag/' + item.id)
    }

    handleEdit = (item) => {
        history.push('/edit-tag/' + item.id)
    }

    handleMerge = (item) => {
        history.push('/merge-tag/' + item.id)
    }

    render() {
        const { t, tagsData } = this.props

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer /><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />

                    <div className="col-lg-12">
                        <div className="header fixed text-center d-flex">
                            <div className="col-lg-12">
                                <h2>{t('order.manage_tags')}</h2>

                            </div>
                            <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>
                        </div>

                        <table className="table table-hover" data-page-size="15">
                            <tbody>
                                {
                                    tagsData ? (
                                        tagsData.map((item, key) => (

                                            <tr className='read' key={ item.id }>
                                                <td>
                                                    <div className="text-black mt-2"><strong>{item.name}</strong></div>
                                                </td>
                                                <td style={ { width: '10px' } }>{
                                                    <div className="float-right">
                                                        <button type="button" className="btn btn-link float-left m-1" onClick={ (e) => this.handleEdit(item) }><i className="fa fa-pencil-alt"></i></button>
                                                    </div>
                                                }
                                                </td>
                                                <td style={ { width: '10px' } }>{
                                                    <div className="float-right">
                                                        <button type="button" className="btn btn-link float-left m-1" onClick={ (e) => this.handleMerge(item) }><i className="fa fa-code-merge"></i></button>
                                                    </div>
                                                }
                                                </td>
                                                <td style={ { width: '10px' } }>{
                                                    <div className="float-right">
                                                        <button type="button" className="btn btn-link float-left m-1" onClick={ (e) => this.handleDelete(item) }><i className="fa fa-trash-alt"></i></button>
                                                    </div>
                                                }
                                                </td>
                                            </tr>
                                        ))) : <tr></tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div></div></div></div>
        )
    }
}

export default withNamespaces()(TagManagementPage)
