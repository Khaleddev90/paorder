import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import history from '../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Autosuggest from 'react-autosuggest'
import Loader from 'components/elements/Loader'
import TopNavContainer from 'containers/elements/TopNavContainer'

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name
  
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
)

class AddTagPage extends Component {

    state = {
        selectedOption: null,
        orderItem: null,
        value: '',
        suggestions: [],
    }
    
    componentDidMount() {
        if (!this.props.fulfilmentOrders) {
            history.push('/')
            return
        }
        const orderItem = this.props.fulfilmentOrders.find((el) =>
            el.id === Number(this.props.match.params.fulfilmentId)
        )
        this.setState({ orderItem })
        this.props.getTags()
    }

    handleClose = (e) => {
        history.goBack()
    }

    handleNext = (e) => {
        this.props.addTag(this.state.orderItem.id, this.state.value)
    }

    // auto suggestion
    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length
    
        return inputLength === 0 ? [] : this.props.tagsData.filter(tag =>
            tag.name.toLowerCase().slice(0, inputLength) === inputValue && !this.state.orderItem.tags.find(o_tag => {
                return o_tag.id === tag.id
            })
        )
    }

    onChange = (event, { newValue }) => {
        const nospace = newValue.replace(/[^A-Z0-9]/ig, '')
        this.setState({
            value: nospace,
        })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        })
    }
    
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        })
    }

    render() {
        const { t } = this.props
        const { value } = this.state

        const disabled = this.state.value !== '' ? false : true

        const inputProps = {
            placeholder: '',
            value,
            onChange: this.onChange,
        }

        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer /><div className="wrapper wrapper-content"><div className="container">
                <div className="row">
                    <Loader loading={ this.props.loading } />

                    <div className="col-lg-12">
                        <div className="header fixed text-center d-flex">
                            <div className="col-lg-12">
                                <h2>{t('order.New_Tag')}</h2>

                            </div>
                            <button type="button" className="btn btn-link btn-close" onClick={ (e) => this.handleClose(e) }><i className="fa fa-times fa-3x"></i></button>
                        </div>

                        <div className="col-lg-12">
                            <h2>{t('order.enter_a_tag_name')}</h2>
                        </div>
                        <div className="col-lg-12">
                            { this.state.orderItem && this.props.tagsData
                                ? <Autosuggest
                                    suggestions={ this.state.suggestions }
                                    onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
                                    onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
                                    getSuggestionValue={ getSuggestionValue }
                                    renderSuggestion={ renderSuggestion }
                                    inputProps={ inputProps }
                                />
                                : ''
                            }
                        </div>
                        <div className="footer fixed text-center d-flex" style={ { zIndex: '1002' } }>
                            <button disabled={ disabled } type="button" className="btn-item-add" onClick={ (e) => this.handleNext(e) }>{t('order.Add_Tag')}</button>
                        </div>
                    </div>
                </div>

            </div></div></div></div>
        )
    }
}

export default withNamespaces()(AddTagPage)
