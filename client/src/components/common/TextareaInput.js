import React from 'react';
import PropTypes from 'prop-types';

const TextareaInput = ({
  name,
  placeholder,
  value,
  onChange,
  errors,
  info
}) => {
  return (
    <div className='form-control'>
      {errors && (
        <div className='form-error'>
          <span className='text-primary'>{errors}</span>
        </div>
      )}
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && (
        <div className='form-info'>
          <span className='text-color'>{info}</span>
        </div>
      )}
    </div>
  );
};

TextareaInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  errors: PropTypes.string,
  info: PropTypes.string
};

export default TextareaInput;
