
import React from 'react';

export default function BaseInput(props) {
  const {
    label = "",
    message = "",
    inputClass = "input",
    value = "",
    inline = false,
    grow = false,
    onChange,
    ...rest
  } = props;

  const handleInput = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={`${inline ? 'inline-field' : 'field'} ${grow ? 'grow' : ''}`}>
      <label className={inline ? 'inline-input-label' : 'input-label'}>
        {label}
      </label>
      <input
        value={value}
        onChange={handleInput}
        className={inputClass}
        {...rest}
      />
      {message && (
        <div className="validation-wrapper">
          <span className="tooltip right validation-message" data-tooltip={message}>
            <i className="ri-error-warning-fill validation-icon"></i>
          </span>
        </div>
      )}
    </div>
  );
}
