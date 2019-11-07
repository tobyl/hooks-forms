import React from 'react'
import classNames from 'classnames'
import useField from './utils/fieldHook'

const Select = ({ name, choices }) => {

  const { value, onChange, onFocus, onBlur, active, touched, error } = useField(name)

  const cls = classNames('field select-field', {
    'active': active,
    'touched': touched,
    'has-error': error,
  })

  const getOptions = () => {
    let finalChoices = choices
    if (!finalChoices) {
      finalChoices = [['yes', 'Yes'], ['no', 'No']]
    }
    return (
      finalChoices.map(ch =>
        <option key={ch[0]} value={ch[0]}>{ch[1]}</option>
      )
    )
  }

  return (
    <div className={cls}>
      <select
        value={value || ''}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <option value={-1}>Select...</option>
        {getOptions()}
      </select>
    </div>
  )
}

export default Select