import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import noop from 'lodash/noop'
import uniq from 'lodash/uniq'
import ClassNames from 'classnames'
import memoizeOne from 'memoize-one'
import Tag from './Tag'

import { buildRegExpFromDelimiters } from './utils'

//Constants
import {
    KEYS,
    DEFAULT_PLACEHOLDER,
    DEFAULT_CLASSNAMES,
    DEFAULT_LABEL_FIELD,
} from './constants'

const updateClassNames = memoizeOne((classNames) => {
    return {
        classNames: { ...DEFAULT_CLASSNAMES, ...classNames },
    }
})

class ReactTags extends Component {

    static defaultProps = {
        placeholder: DEFAULT_PLACEHOLDER,
        labelField: DEFAULT_LABEL_FIELD,
        suggestions: [],
        delimiters: [KEYS.ENTER, KEYS.TAB],
        autofocus: true,
        inline: true,
        handleDelete: noop,
        handleAddition: noop,
        allowDeleteFromEmptyInput: true,
        allowAdditionFromPaste: true,
        resetInputOnDelete: true,
        autocomplete: false,
        readOnly: false,
        allowUnique: true,
        allowDragDrop: true,
        tags: [],
    };

    constructor(props) {
        super(props)
        const { suggestions, classNames } = props
        this.state = {
            suggestions,
            query: '',
            isFocused: false,
            selectedIndex: -1,
            selectionMode: false,
            classNames: { ...DEFAULT_CLASSNAMES, ...classNames },
        }
    }

    static getDerivedStateFromProps(props) {
        const { classNames } = props
        return updateClassNames(classNames)
    }

    componentDidMount() {
        const { autofocus, readOnly } = this.props
        if (autofocus && !readOnly) {
            this.resetAndFocusInput()
        }
    }

    filteredSuggestions = (query, suggestions) => {
        if (this.props.handleFilterSuggestions) {
            return this.props.handleFilterSuggestions(query, suggestions)
        }

        return suggestions.filter((item) => {
            return (
                item[this.props.labelField]
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) === 0
            )
        })
    }

    resetAndFocusInput = () => {
        this.setState({ query: '' })
        if (this.textInput) {
            this.textInput.value = ''
            this.textInput.focus()
        }
    }

    handleDelete = (i, e) => {
        this.props.handleDelete(i, e)
        if (!this.props.resetInputOnDelete) {
            this.textInput.focus()
        } else {
            this.resetAndFocusInput()
        }
        e.stopPropagation()
    }

    handleTagClick = (i, e) => {
        if (this.props.handleTagClick) {
            this.props.handleTagClick(i, e)
        }
        if (!this.props.resetInputOnDelete) {
            this.textInput.focus()
        } else {
            this.resetAndFocusInput()
        }
    }

    handleChange = (e) => {
        if (this.props.handleInputChange) {
            this.props.handleInputChange(e.target.value)
        }

        const query = e.target.value.trim()
        const suggestions = this.filteredSuggestions(query, this.props.suggestions)

        const { selectedIndex } = this.state

        this.setState({
            query: query,
            suggestions: suggestions,
            selectedIndex:
                selectedIndex >= suggestions.length
                    ? suggestions.length - 1
                    : selectedIndex,
        })
    }

    handleFocus = (e) => {
        const value = e.target.value
        if (this.props.handleInputFocus) {
            this.props.handleInputFocus(value)
        }
        this.setState({ isFocused: true })
    }

    handleBlur = (e) => {
        const value = e.target.value
        if (this.props.handleInputBlur) {
            this.props.handleInputBlur(value)
            if (this.textInput) {
                this.textInput.value = ''
            }
        }
        this.setState({ isFocused: false })
    }

    handleKeyDown = (e) => {
        const { query, selectedIndex, suggestions, selectionMode } = this.state

        // hide suggestions menu on escape
        if (e.keyCode === KEYS.ESCAPE) {
            e.preventDefault()
            e.stopPropagation()
            this.setState({
                selectedIndex: -1,
                selectionMode: false,
                suggestions: [],
            })
        }

        // When one of the terminating keys is pressed, add current query to the tags.
        // If no text is typed in so far, ignore the action - so we don't end up with a terminating
        // character typed in.
        if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
            if (e.keyCode !== KEYS.TAB || query !== '') {
                e.preventDefault()
            }

            const selectedQuery =
                selectionMode && selectedIndex !== -1
                    ? suggestions[selectedIndex]
                    : { id: query, [this.props.labelField]: query }

            if (selectedQuery !== '') {
                this.addTag(selectedQuery)
            }
        }

        // when backspace key is pressed and query is blank, delete tag
        if (
            e.keyCode === KEYS.BACKSPACE &&
            query === '' &&
            this.props.allowDeleteFromEmptyInput
        ) {
            this.handleDelete(this.props.tags.length - 1, e)
        }

        // up arrow
        if (e.keyCode === KEYS.UP_ARROW) {
            e.preventDefault()
            this.setState({
                selectedIndex:
                    selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1,
                selectionMode: true,
            })
        }

        // down arrow
        if (e.keyCode === KEYS.DOWN_ARROW) {
            e.preventDefault()
            this.setState({
                selectedIndex:
                    suggestions.length === 0
                        ? -1
                        : (selectedIndex + 1) % suggestions.length,
                selectionMode: true,
            })
        }
    }

    handlePaste = (e) => {
        if (!this.props.allowAdditionFromPaste) {
            return
        }

        e.preventDefault()

        const clipboardData = e.clipboardData || window.clipboardData
        const clipboardText = clipboardData.getData('text')

        const { maxLength = clipboardText.length } = this.props

        const maxTextLength = Math.min(maxLength, clipboardText.length)
        const pastedText = clipboardData.getData('text').substr(0, maxTextLength)

        // Used to determine how the pasted content is split.
        const delimiterRegExp = buildRegExpFromDelimiters(this.props.delimiters)
        const tags = pastedText.split(delimiterRegExp)

        // Only add unique tags
        uniq(tags).forEach((tag) =>
            this.addTag({ id: tag, [this.props.labelField]: tag })
        )
    }

    addTag = (tag) => {
        const { tags, labelField, allowUnique } = this.props
        if (!tag.id || !tag[labelField]) {
            return
        }
        const existingKeys = tags.map((tag1) => tag1.id.toLowerCase())

        // Return if tag has been already added
        if (allowUnique && existingKeys.indexOf(tag.id.toLowerCase()) >= 0) {
            return
        }
        if (this.props.autocomplete) {
            const possibleMatches = this.filteredSuggestions(
                tag[labelField],
                this.props.suggestions
            )

            if (
                (this.props.autocomplete === 1 && possibleMatches.length === 1) ||
                (this.props.autocomplete === true && possibleMatches.length)
            ) {
                tag = possibleMatches[0]
            }
        }

        // call method to add
        this.props.handleAddition(tag)

        // reset the state
        this.setState({
            query: '',
            selectionMode: false,
            selectedIndex: -1,
        })

        this.resetAndFocusInput()
    }

    handleSuggestionClick = (i) => {
        this.addTag(this.state.suggestions[i])
    }

    handleSuggestionHover = (i) => {
        this.setState({
            selectedIndex: i,
            selectionMode: true,
        })
    }

    moveTag = (dragIndex, hoverIndex) => {
        const tags = this.props.tags

        // locate tags
        const dragTag = tags[dragIndex]

        // call handler with the index of the dragged tag
        // and the tag that is hovered
        this.props.handleDrag(dragTag, dragIndex, hoverIndex)
    }

    getTagItems = () => {
        const {
            tags,
            removeComponent,
            readOnly,
            allowDragDrop,
        } = this.props
        const { classNames } = this.state
        const moveTag = allowDragDrop ? this.moveTag : null
        return tags.map((tag, index) => {
            return (
                <Tag
                    key={ tag.id }
                    index={ index }
                    tag={ tag }
                    onDelete={ this.handleDelete.bind(this, tag.id) }
                    moveTag={ moveTag }
                    removeComponent={ removeComponent }
                    onTagClicked={ this.handleTagClick.bind(this, tag.id) }
                    readOnly={ readOnly }
                    classNames={ classNames }
                    allowDragDrop={ allowDragDrop }
                />
            )
        })
    }

    render() {
        const tagItems = this.getTagItems()
        return (
            <div className={ ClassNames(this.state.classNames.tags, 'react-tags-wrapper') }>
                <div className={ this.state.classNames.selected }>
                    {tagItems}
                </div>
            </div>
        )
    }
}

const WithContext = DragDropContext(HTML5Backend)(ReactTags)
export { WithContext, KEYS }
