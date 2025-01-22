import React from 'react';

export default function BaseSelect(props) {
  const {
    label = "",
    selectClass = "input",
    value = "",
    options = [],
    required = false,
    inline = false,
    disabled = false,
    onChange,
    ...rest
  } = props;

  const available = (value, options) => {
    return value
      ? options.some((option) => option === value || option.value === value)
      : true;
  };

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={inline ? 'inline-field' : 'field'}>
      <label className={inline ? 'inline-input-label' : 'input-label'}>
        {label}
      </label>
      <select
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className={`${selectClass} ${!available(value, options) ? 'unavailable' : ''}`}
        {...rest}
      >
        {!required && available(value, options) && <option value=""></option>}
        
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value || option}
            selected={option.value === value || option === value}
          >
            {option.label || option}
          </option>
        ))}
        
        {!available(value, options) && (
          <option className="unavailable-option" value={value}>
            {value}
          </option>
        )}
      </select>
    </div>
  );
}