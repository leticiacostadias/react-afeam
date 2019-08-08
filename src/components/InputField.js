import React from 'react';

function InputField ({ label, id, type, value, onChange, required, error }) {
  return (
    <div className="loginPage__inputWrap">
      <label className="loginPage__label" htmlFor={id}>
        {label}
      </label>

      <input
        className="loginPage__input"
        type={type}
        id={id}
        name={id}
        value={value}
        required={required}
        onChange={onChange}
      />

      <p style={{ color: 'red' }}>
        {error}
      </p>
    </div>
  );
}

InputField.propTypes = {};

InputField.defaultProps = {};

export default InputField;
