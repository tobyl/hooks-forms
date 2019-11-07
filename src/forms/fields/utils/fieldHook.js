import { useState, useContext } from 'react'
import { FormContext } from '../../Form'

const useField = (name) => {
  let form = useContext(FormContext)

  const [touched, setTouched] = useState(false)
  const [active, setActive] = useState(false)

  const onChange = e => {
    let val = e.target.value
    form.setValue(name, val)
    if (form.errors[name]) form.clearError(name)
  }

  const onFocus = e => {
    setActive(true)
    setTouched(true)
  }

  const onBlur = e => {
    setActive(false)
  }

  return { value: form.data[name], active, touched, onChange, onFocus, onBlur, error: form.errors[name] }
}

export default useField