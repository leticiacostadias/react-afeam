import React from 'react';
import PropTypes from 'prop-types';

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

InputField.propTypes = {
  label: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  error: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

InputField.defaultProps = {
  error: '',
  value: '',
  type: 'text',
  required: false
};

export default InputField;
