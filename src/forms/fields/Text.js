import React from 'react'
import classNames from 'classnames'
import useField from './utils/fieldHook'

const Text = ({ name, placeholder, label, ChangeCallback }) => {

  const { value, onChange, onFocus, onBlur, active, touched, error } = useField(name, ChangeCallback)

  const cls = classNames('field text-field', {
    'active': active,
    'touched': touched,
    'has-error': error,
  })

  return (
    <div className={cls}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        value={value || ''}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <div className="field-error">{error}</div>}
    </div>
  )
}

export default Text