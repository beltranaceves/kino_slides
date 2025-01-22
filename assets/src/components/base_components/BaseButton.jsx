import React from 'react';

export default function BaseButton(props) {
  const {
    label = "",
    onAddOperation,
    noDataFrame,
  } = props;

  return (
    <button 
      className="button button--sm button--dashed" 
      type="button" 
      disabled={noDataFrame}
      onClick={onAddOperation}
    >
      <i className="ri-add-line"></i>
      <span className="dashed-button-label">{label}</span>
    </button>
  );
}
