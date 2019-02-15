import React from 'react';

const TextfieldInput = ({
  name,
  placeholder,
  value,
  onChange,
  errors,
  type
}) => {
  return (
    <div className='form-control'>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors && <span className='form-error'>{errors}</span>}
    </div>
  );
};

export default TextfieldInput;
