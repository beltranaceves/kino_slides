import React from 'react';

export default function BaseSwitch(props) {
  const {
    label = "",
    value = false,
    fieldClass = "field",
    switchClass = "default",
    onChange,
    inner,
    ...rest
  } = props;

  const handleInput = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div className={inner ? 'inner-field' : fieldClass}>
      <label className="input-label">{label}</label>
      <div className="input-container">
        <label className="switch-button">
          <input
            checked={value}
            type="checkbox"
            onChange={handleInput}
            className={`switch-button-checkbox ${switchClass}`}
            {...rest}
          />
          <div className={`switch-button-bg ${switchClass}`} />
        </label>
      </div>
    </div>
  );
}
