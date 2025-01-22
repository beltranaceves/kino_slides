import React, { useState } from 'react';
import BaseCard from '../components/base_components/BaseCard';
import BaseInput from '../components/base_components/BaseInput';
import BaseSelect from '../components/base_components/BaseSelect';
import BaseButton from '../components/base_components/BaseButton';
import BaseSwitch from '../components/base_components/BaseSwitch';

export default function Sample() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [switchEnabled, setSwitchEnabled] = useState(false);

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto'
    },
    cardForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem 0'
    }
  };

  return (
    <div style={styles.container}>
      <BaseCard
        onRemoveOperation={() => console.log('Remove clicked')}
        contentSlot={
          <div style={styles.cardForm}>
            <BaseInput
              label="Sample Input"
              value={inputValue}
              onChange={setInputValue}
              message="This is a validation message"
            />

            <BaseSelect
              label="Choose an option"
              value={selectedOption}
              options={selectOptions}
              onChange={setSelectedOption}
            />

            <BaseSwitch
              label="Toggle Feature"
              value={switchEnabled}
              onChange={setSwitchEnabled}
            />
          </div>
        }
        controlsSlot={
          <BaseButton
            label="Add Item"
            onAddOperation={() => console.log('Add clicked')}
          />
        }
      />
    </div>
  );
}
