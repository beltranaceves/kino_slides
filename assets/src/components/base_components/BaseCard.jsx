
import React, { useState } from 'react';

export default function BaseCard(props) {
  const {
    children,
    onRemoveOperation,
    moveSlot,
    contentSlot,
    toggleSlot,
    controlsSlot
  } = props;

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="card">
      <div className="card-content">
        {moveSlot}
        {contentSlot}
      </div>
      <div className="card-buttons">
        <div className="operation-controls">
          {toggleSlot}
          <button
            className="button button--sm icon-only"
            onClick={onRemoveOperation}
            type="button"
          >
            <i className="ri-delete-bin-line button-svg"></i>
          </button>
        </div>
        <div className="card-controls">
          {controlsSlot}
        </div>
      </div>
    </div>
  );
}
