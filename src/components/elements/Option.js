import React, {Component} from 'react'

export default class Option extends Component {
    
    _handleChange = () => {
        this.props.onCheckItem(this.props.value)
    };
  
    render() {
        const { disabled, checked ,label } = this.props
        return (
            <div className="i-checks">
                <label className=""> 
                    <div className={ checked ? 'iradio_square-green checked' : 'iradio_square-green' } style={ {position: 'relative'} }>
                        <input type="radio" value="option1" name="a" style={ {position: 'absolute', opacity: '0'} }
                            checked={ checked }
                            disabled={ disabled }
                            onChange={ this._handleChange }/>
                        <ins className="iCheck-helper iCheck-custom" ></ins>
                    </div>
                    <i></i> {label}
                </label>
            </div>
        )
    }
}
