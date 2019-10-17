import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import ClassNames from 'classnames'
import {
    tagSource,
    tagTarget,
    dragSource,
    dropCollect,
} from './DragAndDropHelper'
import { canDrag } from './utils'

import RemoveComponent from './RemoveComponent'

const ItemTypes = { TAG: 'tag' }

class Tag extends Component {
    render() {
        const { props } = this
        const {
            connectDragSource,
            isDragging,
            connectDropTarget,
            readOnly,
            tag,
            classNames,
        } = props
        const tagComponent = (<span
            className={ ClassNames('tag-wrapper', classNames.tag) }
            style={ { opacity: isDragging ? 0 : 1, 'cursor': canDrag(props) ? 'move' : 'auto' } }
            onClick={ props.onTagClicked }
            onKeyDown={ props.onTagClicked }
            onTouchStart={ props.onTagClicked }>
            {tag.name}
            {tag.id !== '-1'
                ? <RemoveComponent
                    tag={ props.tag }
                    className={ classNames.remove }
                    removeComponent={ props.removeComponent }
                    onClick={ props.onDelete }
                    readOnly={ readOnly }
                />
                : ''
            }

        </span>
        )
        return connectDragSource(connectDropTarget(tagComponent))
    }
}

Tag.defaultProps = {
    labelField: 'text',
    readOnly: false,
}

export default flow(
    DragSource(ItemTypes.TAG, tagSource, dragSource),
    DropTarget(ItemTypes.TAG, tagTarget, dropCollect)
)(Tag)
