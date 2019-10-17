import React from 'react'
import randomstring from 'randomstring'

const FormInput = ({ onKeyPress, showCheck, hasSuccess, hasWarning, hasErrors, errors, labelText, inputType, inputName, value, onChangeHandler, placeholderText, disabled, autoFocus, maxLength }) => {
    const uniqueId = randomstring.generate()
    return (
        <div
            className={ 'form-group' + (hasSuccess ? ' has-success' : '') + (hasWarning ? ' has-warning' : '') + (hasErrors || (errors && errors.length > 0) ? ' has-error' : '') }>
            {labelText ? (
                <label className='form-control-label' htmlFor={ uniqueId }>
                    {labelText}
                </label>
            ) : null}
            <div className='d-flex align-items-center'>
                <input onKeyPress={ e => onKeyPress && onKeyPress(e) } 
                    type={ inputType ? inputType : 'text' } name={ inputName } id={ uniqueId }placeholder={ placeholderText } disabled={ disabled } 
                    maxLength={ maxLength ? maxLength : 64 }
                    className={ 'form-control' + (hasSuccess ? ' form-control-success' : '') + (hasWarning ? ' form-control-warning' : '') + (hasErrors || (errors && errors.length > 0) ? ' form-control-error' : '') }
                    value={ value } onChange={ (e) => onChangeHandler(e) } autoFocus={ autoFocus } />
                {showCheck 
                    ? showCheck === 0 ? <div className='w-15px' />
                        : showCheck === 1 ? <div className='checkmark' />
                            : <div className='checkmark-error' />
                    : <div className='w-15px' />
                }
            </div>
            {errors ? errors.map((error, i) => (
                <div key={ i } className='form-control-feedback'>
                    {error}
                </div>
            )) : null}
        </div>
    )
}

export default FormInput
