import React from 'react';
import PropTypes from 'prop-types';

const SelectListInput = ({ name, value, errors, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className='form-control'>
      {errors && (
        <div className='form-error'>
          <span className='text-primary'>{errors}</span>
        </div>
      )}
      <select
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}>
        {selectOptions}
      </select>
      {info && (
        <div className='form-info'>
          <span className='text-color'>{info}</span>
        </div>
      )}
    </div>
  );
};

SelectListInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  errors: PropTypes.string,
  info: PropTypes.string
};
SelectListInput.defaultProps = {
  type: 'text'
};
export default SelectListInput;
