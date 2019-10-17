import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import moment from 'moment'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import TopNavContainer from 'containers/elements/TopNavContainer'

class QuestionDetailPage extends Component {
    state = {
        questionItem: null,
        content:'',
        showEditer: false,
    }
    componentWillReceiveProps(nextProps) {
        
        const orderItem = nextProps.fulfilmentOrders.find((el) =>
            el.id === Number(this.props.match.params.fulfilmentId)
        )

        const questionItem = orderItem.fulfilmentOrderDialogQuestions.find((el) =>
            el.id === Number(this.props.match.params.questionId)
        )

        this.setState({questionItem: questionItem})
    }

    handleAddAnswer = (e) => {
        this.props.addAnswer(Number(this.props.match.params.questionId), this.state.content)
    }

    handleShowEditer = (e) => {
        this.setState(prevState => {
            const showEditer = !prevState.showEditer
            return {
                showEditer: showEditer,
            }
        })
    }

    handleChangeContent = (html) => {
        this.setState({content: html})
    }

    render() {
        const {t} = this.props
        const { questionItem, showEditer } = this.state
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    {questionItem ? (
                        <div className="table-responsive">
                            <div className="row">
                                <div className="col-lg-12 animated fadeInRight">
                                    <div className="mail-box-header">
                                        <div className="float-right tooltip-demo">
                                            {questionItem.createdById === this.props.userId
                                                ? <div className="btn btn-white btn-sm" onClick={ (e) => this.handleShowEditer(e) }><i className="fa fa-reply"></i> {t('order.answer')}</div>
                                                : '' }
                                    
                                        </div>
                                        <h2>
                                        </h2>
                                        <div className="mail-tools tooltip-demo m-t-md">
                                            <h3>
                                                {questionItem.value}
                                            </h3>
                                            <h5>
                                                <span className="float-right font-normal">{moment(questionItem.created_at).calendar()}</span>
                                                <span className="font-normal">From: </span>{questionItem.createdBy.displayName}({questionItem.createdBy.email})
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="mail-box">
                                        <div className="mail-body">
                                            <p>
                                            </p>
                                        </div>
                                        <div className="mail-body text-right tooltip-demo">
                                            {questionItem.createdById === this.props.userId
                                                ? <div className="btn btn-white btn-sm" onClick={ (e) => this.handleShowEditer(e) }><i className="fa fa-reply"></i> {t('order.answer')}</div>
                                                : '' }
                                    
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>                                    
                            </div>

                            {showEditer ? <div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='note-editor note-frame card'>
                                            <ReactQuill value={ this.state.content } onChange={ (e) => this.handleChangeContent(e) } theme='snow'/>
                                        </div>
                        
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className="mail-body text-right tooltip-demo">
                                            <div className="btn btn-sm btn-primary" onClick={ (e) => this.handleAddAnswer(e) }><i className="fa fa-reply"></i> {t('order.send')}</div>                                
                                        </div>
                                    </div>                    
                                </div>
                            </div>
                                : '' }            
                        </div>
                    ) : ''}
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(QuestionDetailPage)
