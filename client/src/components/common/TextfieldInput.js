import React from 'react';

const TextfieldInput = ({
  name,
  placeholder,
  value,
  onChange,
  errors,
  info,
  type
}) => {
  return (
    <div className='form-control'>
      {errors && (
        <div className='form-error'>
          <span className='text-primary'>{errors}</span>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows='10'
      />
      {info && (
        <div className='form-info'>
          <span className='text-color'>{info}</span>
        </div>
      )}
    </div>
  );
};

export default TextfieldInput;
