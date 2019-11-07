import React from 'react'
import classNames from 'classnames'
import useField from './utils/fieldHook'

const Text = ({ name, placeholder }) => {

  const { value, onChange, onFocus, onBlur, active, touched, error } = useField(name)

  const cls = classNames('field text-field', {
    'active': active,
    'touched': touched,
    'has-error': error,
  })

  return (
    <div className={cls}>
      <input
        type="text"
        value={value || ''}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Text