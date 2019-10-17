import React, {Component} from 'react'

export default class Checkbox extends Component {
    
    _handleChange = () => {
        this.props.onCheckItem(this.props.itemkey)
    };
  
    render() {
        const { disabled, checked } = this.props
        return (
            <div className="React__checkbox">
                <label>
                    <input 
                        type="checkbox"
                        className="React__checkbox--input"
                        checked={ checked }
                        disabled={ disabled }
                        onChange={ this._handleChange }
                    />
                    <span 
                        className="React__checkbox--span"
                    />
                </label>
            </div>
        )
    }
}
